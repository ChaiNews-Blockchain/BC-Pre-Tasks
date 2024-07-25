// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DemoToken.sol";

contract ChainewsDapp is Ownable{
    DemoToken Token; 
    address public tokenAddr;
    uint256 public currentNewsId;
    uint256 public currentUserId;

    mapping(uint256 => News) public news;
    mapping(address => User) public users;
    
    struct News {
        uint256 id;
        address owner;
        string url;
        bytes32 hash;
        uint256 points;
    }

    struct User {
        uint256 id;
        uint256[] newsbyId;
        uint256 allPoints;
        uint256 unspentPoints;
    }

    constructor(
        address _tokenAddr
    ) {
        tokenAddr = _tokenAddr;
        Token = DemoToken(_tokenAddr);
        transferOwnership(msg.sender);
        currentNewsId = 1;
        currentUserId = 1;
    }

    function addNews(string memory _url, address _owner, bytes32 _hash) external { 
        News storage newNews = news[currentNewsId]; // should add news with same url, owner, hash and points
        newNews.url = _url;
        newNews.owner = _owner;
        newNews.id = currentNewsId;
        newNews.points = 0;
        newNews.hash = _hash;
        if(users[_owner].id==0){
            User storage newUser = users[_owner]; // should add user with same points and should push news id into newsbyid 
            newUser.newsbyId = [currentNewsId];
            newUser.allPoints = 0;
            newUser.unspentPoints = 0;
            newUser.id = currentUserId;
            currentUserId ++;                     // // should increase currentnewsId
        }else{
            users[_owner].newsbyId.push(currentNewsId);
        }
        currentNewsId++;                          // should increase currentnewsId
    }

    function updateNews( uint256 _id, uint256 _newPoints) external { // should update news points
        require(_newPoints>news[_id].points, "You have to update points with higher value than current value");
        News storage newNews = news[_id];
        newNews.points = _newPoints;
    }

    function updateUsers( address[] memory _userAddresses, uint256[] memory _userPoints) external { // sholud update user points
        // require(_newPoints>users[_userAddress].allPoints, "You have to update points with higher value than current value");

        for (uint i=0; i<_userAddresses.length; i++) {
            users[_userAddresses[i]].allPoints += _userPoints[i]; 
            users[_userAddresses[i]].unspentPoints = _userPoints[i]; 
        } 
        // User storage newUser = users[_userAddress];
        // newUser.unspentPoints += _newPoints - newUser.allPoints; 
        // newUser.allPoints = _newPoints;
    }
    
    function getUserId(address _userAddress) external view returns (uint256) { 
        return users[_userAddress].id;
    }

    function getNewsByIdLength(address _userAddress) external view returns (uint256) { 
        return users[_userAddress].newsbyId.length;
    }

    function getNewsById()external view returns (uint256 [] memory) {
            return users[msg.sender].newsbyId;
    }
    function getSenderAddress()external view returns (address){
            return msg.sender;
    }
    
    function updateTokenAddress(address newTokenAddr) public { // should update token address
        tokenAddr = newTokenAddr;
    }    

    function dropTokens(address _recipient, uint256 _amount)internal {
        require(_recipient != address(0));
        // uint256 amount = calculateAmount(_points);
        require(Token.transfer(_recipient, _amount* 1 ether)); 
    }

    function withdrawTokens(address beneficiary) public onlyOwner{
        require(Token.transfer(beneficiary, Token.balanceOf(address(this))));
    }

    // function calculateAmount(uint256 _points) internal pure returns (uint256){
    //     uint256 amount = _points/10;
    //     günlüktoplampuan - userpoints
    //     return amount;
    // }

    function spendPoints (uint256 _points) public { // sholud spend user points and updates 
        require(users[msg.sender].unspentPoints>=_points, "Not enough points");
        users[msg.sender].unspentPoints -=_points;
        // User storage newUser = users[_userAddress];
        // newUser.unspentPoints -= _points;
        dropTokens(msg.sender, _points);
    }
    
}

