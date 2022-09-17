pragma solidity ^0.8.13;

interface IPoap {
    event EventToken(uint256 eventId, uint256 tokenId);

    /**
     * @dev Gets the token name
     * @return string representing the token name
     */
    function name() external view returns (string memory);

    /**
     * @dev Gets the token symbol
     * @return string representing the token symbol
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Gets the event id for a token
     * @return string representing the token symbol
     */
    function tokenEvent(uint256 tokenId) external view returns (uint256);

    /**
     * @dev Gets the token ID at a given index of the tokens list of the requested owner
     * @param owner address owning the tokens list to be accessed
     * @param index uint256 representing the index to be accessed of the requested tokens list
     * @return tokenId token ID at the given index of the tokens list owned by the requested address
     * @return eventId event ID for the token at the given index of the tokens owned by the address
     */
    function tokenDetailsOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId, uint256 eventId);

    /**
     * @dev Gets the token uri
     * @return string representing the token uri
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Function to mint tokens
     * @param eventId EventId for the new token
     * @param to The address that will receive the minted tokens.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintEventToManyUsers(uint256 eventId, address[] memory to)
    external returns (bool);

    /**
     * @dev Function to mint tokens
     * @param eventIds EventIds to assing to user
     * @param to The address that will receive the minted tokens.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintUserToManyEvents(uint256[] memory eventIds, address to)
    external returns (bool);

    /**
     * @dev Burns a specific ERC721 token.
     * @param tokenId uint256 id of the ERC721 token to be burned.
     */
    function burn(uint256 tokenId) external;
}