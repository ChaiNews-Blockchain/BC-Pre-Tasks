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

    function addNews(string memory _url, address _owner, bytes32 _hash) external onlyOwner{ 
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

    function updateNews( uint256 _id, uint256 _newPoints) external onlyOwner{ // should update news points
        require(_newPoints>news[_id].points, "You have to update points with higher value than current value");
        News storage newNews = news[_id];
        newNews.points = _newPoints;
    }

    function updateUser( address _userAddress,uint256 _newPoints) external onlyOwner{ // sholud update user points
        require(_newPoints>users[_userAddress].allPoints, "You have to update points with higher value than current value");
        User storage newUser = users[_userAddress];
        newUser.unspentPoints += _newPoints - newUser.allPoints; 
        newUser.allPoints = _newPoints;
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
    
    function updateTokenAddress(address newTokenAddr) public onlyOwner { // should update token address
        tokenAddr = newTokenAddr;
    }    

    function dropTokens(address _recipient, uint256 _amount) public onlyOwner returns (bool) {
        require(_recipient != address(0));
        require(Token.transfer(_recipient, _amount* 10**18));
        return true;
    }

    function withdrawTokens(address beneficiary) public onlyOwner {
        require(Token.transfer(beneficiary, Token.balanceOf(address(this))));
    }

    function spendPoints (address _userAddress, uint256 _points) public onlyOwner{ // sholud spend user points and updates 
        require(users[_userAddress].unspentPoints>=_points, "Not enough points");
        User storage newUser = users[_userAddress];
        newUser.unspentPoints -= _points;
        dropTokens(_userAddress, _points/10);
    }
    
}

