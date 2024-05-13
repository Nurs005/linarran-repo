// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/interfaces/IERC20.sol";
contract Staking{

    IERC20 stakingToken;
    uint public rate;
    address public owner;

    event Staked(address indexed user, uint amount);
    event Unstaked(address indexed user);
    event RewardsClaimed(address indexed user, uint rewardAmount);
    event RateUpdated(uint newRate);

    constructor(address _token, uint _rate){
        stakingToken = IERC20(_token);
        rate = _rate;
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender, "onlyOwner");
        _;
    }

    struct Staker {
        uint lastStakedTime;
        uint reward;
        uint stakedAmount;
    }

    mapping (address => Staker) public stakersList;


    function setRate(uint _newRate) external onlyOwner {
        rate = _newRate;
        emit RateUpdated(_newRate);
    }

    
    function calculateRewards(address _user) public view returns(uint){
        Staker memory newStaker = stakersList[_user];
        uint hoursPassed = (block.timestamp - newStaker.lastStakedTime) / 1 hours;
        return newStaker.stakedAmount * hoursPassed * rate  / 10000000;
    }
    

    function stake(uint _amount) external {
        require(_amount > 0, "Cannot stake zero tokens");
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        Staker storage newStaker = stakersList[msg.sender];

        newStaker.reward += calculateRewards(msg.sender);
        newStaker.lastStakedTime = block.timestamp;
        newStaker.stakedAmount += _amount;
        emit Staked(msg.sender, _amount);
    }


    function claimRewards() external {
        uint curReward = calculateRewards(msg.sender);
        require(curReward > 0, "Reward is zero");
        stakingToken.transfer(msg.sender, curReward);
        Staker storage newStaker = stakersList[msg.sender];
        newStaker.reward = 0;
        emit RewardsClaimed(msg.sender, curReward);
        newStaker.lastStakedTime = block.timestamp;
    }


    function unstake() external {
        Staker storage newStaker = stakersList[msg.sender];
        require(newStaker.stakedAmount >= 0, "Insufficient staked amount");
        newStaker.reward += calculateRewards(msg.sender);
        uint sum = newStaker.reward + newStaker.stakedAmount;
        require(stakingToken.transfer(msg.sender, sum));
        newStaker.lastStakedTime = block.timestamp;
        newStaker.stakedAmount = 0;
        emit Unstaked(msg.sender);
    }

}