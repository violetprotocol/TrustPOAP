pragma solidity ^0.8.13;

interface ITrustPOAP {
    struct Review {
        uint256 eventId;
        string uri;
    }
    function submitReview(uint256 hbtId, uint256 poapTokenId, string calldata uri) external;
}