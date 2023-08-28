// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";

contract YourToken {
    address public owner;
    uint256 public newsId;
    uint256 public userId;

    mapping(address => uint256) public balanceOf;
    mapping(uint256 => News) public news;
    mapping(address => User) public users;
    
    struct News {
        string url;
        address owner;
        uint256 id;
        uint256 pop;
        bytes32 hash;
    }

    struct User {
        uint256 id;
        uint256[] newsbyId;
        uint256 population;
    }
    constructor(

    ) {
        owner = msg.sender;
        newsId = 1;
        userId = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function addNews(string memory _url, address _owner, bytes32 _hash) external onlyOwner{
        News storage newNews = news[newsId];
        newNews.url = _url;
        newNews.owner = _owner;
        newNews.id = newsId;
        newNews.pop = 0;
        newNews.hash = _hash;
        if(users[_owner].id!=0){
            users[_owner].newsbyId.push(newsId);
        }else{
            User storage newUser = users[_owner];
            newUser.newsbyId = [newsId];
            newUser.population = 0;
            newUser.id = userId;
            userId ++;
        }
        newsId++;
    }

    function updateNews(uint256 _pop, uint256 _id) external onlyOwner{
        News storage newNews = news[_id];
        newNews.pop = _pop;
    }
    
    function checkUser() external view returns (uint256) { 
        return users[msg.sender].id;
    }
    function getLength(address _userAddress) external view onlyOwner returns (uint256) { 
        return users[_userAddress].newsbyId.length;
    }

}

