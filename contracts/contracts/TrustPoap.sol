pragma solidity ^0.8.13;

import "./IPoap.sol";
import "./IGetterLogic.sol";

contract TrustPOAP {
    address humanboundToken;
    address poap;

    mapping(uint256 => string) reviewURIbyReviewId;
    mapping(uint256 => uint256[]) reviewersByEventId;

    constructor(address _humanboundToken, address _poap) {
        humanboundToken = _humanboundToken;
        poap = _poap;
    }

    modifier onlyUniqueHuman(uint256 hbtId) {
        require(IGetterLogic(humanboundToken).balanceOf(msg.sender) > 0, "caller is not human");
        require(IGetterLogic(humanboundToken).ownerOf(hbtId) == msg.sender, "caller is not holder of this hbt");
        _;
    }

    modifier onlyUnwrittenReview(uint256 eventId, uint256 hbtId, uint256 tokenId) {
        // uint256 eventId = IPoap(poap).tokenEvent(tokenId);
        uint256 reviewId = calculateReviewId(hbtId, eventId);

        require(bytes(reviewURIbyReviewId[reviewId]).length == 0, "this human has already written a review");
        _;
    }

    modifier onlyAttendee(uint256 tokenId) {
        // require(IGetterLogic(poap).ownerOf(tokenId) == msg.sender, "caller did not attend this event");
        _;
    }

    function submitReview(uint256 eventId, uint256 hbtId, uint256 poapTokenId, string calldata uri) public 
        onlyUniqueHuman(hbtId)
        onlyAttendee(poapTokenId) 
        onlyUnwrittenReview(eventId, hbtId, poapTokenId)
    {
        // uint256 eventId = IPoap(poap).tokenEvent(poapTokenId);
        uint256 reviewId = calculateReviewId(hbtId, eventId);

        reviewURIbyReviewId[reviewId] = uri;
        reviewersByEventId[eventId].push(hbtId);
    }

    function getEventReviewURIs(uint256 eventId) public view returns(string[] memory reviews) {
        uint256[] memory reviewers = reviewersByEventId[eventId];

        reviews = new string[](reviewers.length);
        for (uint256 i = 0; i < reviewers.length; i++) {
            uint256 reviewer = reviewers[i];
            uint256 reviewId = calculateReviewId(reviewer, eventId);
            reviews[i] = reviewURIbyReviewId[reviewId];
        }
    }

    function calculateReviewId(uint256 hbt, uint256 eventId) internal pure returns(uint256) {
        return uint256(keccak256(abi.encodePacked(hbt, eventId)));
    }
}