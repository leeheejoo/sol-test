pragma solidity >=0.4.21 <0.6.0;


contract TestStateMachine {

    event Bid(string log);
    event Reveal(string log);
    event DetermineWinner(string log);
    event Finish(string log);

    enum Stages {
        AcceptingBlindBids,
        RevealBids,
        WinnerDetermined,
        Finished
    }

    Stages public stage = Stages.AcceptingBlindBids;

    uint public creationTime = now;

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }

    modifier transitionAfter() {
        _;
        _nextStage();
    }

    modifier timedTransitions() {
        if (stage == Stages.AcceptingBlindBids && now >= creationTime + 2 minutes) {
            _nextStage();
        }
        if (stage == Stages.RevealBids && now >= creationTime + 4 minutes) {
            _nextStage();
        }
        _;
    }

    function bid() public payable timedTransitions atStage(Stages.AcceptingBlindBids) {
        
        emit Bid('current state is AcceptingBlindBids!!');
    }

    function reveal() public timedTransitions atStage(Stages.RevealBids) {
        
        emit Reveal('current state is RevealBids!!');
    }

    function determineWinner() public timedTransitions atStage(Stages.WinnerDetermined) transitionAfter {
        
        emit DetermineWinner('current state is WinnerDetermined!!');
    }

    function finish() public atStage(Stages.Finished) {
        
        emit Finish('current state is Finished!!');
    }

    function _nextStage() internal {
        require(stage != Stages.Finished, 'current state is finished!!');
        stage = Stages(uint(stage) + 1);
    }
}