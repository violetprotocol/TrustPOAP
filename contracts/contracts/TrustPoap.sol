pragma solidity ^0.8.13;

import "./IPoap.sol";
import "./ITrustPoap.sol";
import "./IGetterLogic.sol";

contract TrustPoap is ITrustPoap {
    address humanboundToken;
    address poap;

    // maps eventId => HBT id => review
    mapping(uint256 => mapping(uint256 => Review)) reviewsByEventId;

    constructor(address _humanboundToken, address _poap) {
        humanboundToken = _humanboundToken;
        poap = _poap;
    }

    modifier onlyUniqueHuman(uint256 hbtId) {
        require(IGetterLogic(humanboundToken).ownerOf(hbtId) == msg.sender, "caller is not human");
        _;
    }

    modifier onlyUnwrittenReview(uint256 hbtId, uint256 tokenId) {
        uint256 eventId = IPoap(poap).tokenEvent(tokenId);
        require(bytes(reviewsByEventId[eventId][hbtId].uri).length > 0);
        _;
    }

    modifier onlyAttendee(uint256 tokenId) {
        require(IGetterLogic(poap).ownerOf(tokenId) == msg.sender);
        _;
    }

    function submitReview(uint256 hbtId, uint256 poapTokenId, string calldata uri) public override 
        onlyUniqueHuman(hbtId)
        onlyAttendee(poapTokenId) 
        onlyUnwrittenReview(hbtId, poapTokenId)
    {
        uint256 eventId = IPoap(poap).tokenEvent(poapTokenId);
        reviewsByEventId[eventId][hbtId].uri = uri;
    }
}