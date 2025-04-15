// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IPOLottery {
    address public sebi;
    address public primaryRegistrar;
    address public extraRegistrar1;
    address public extraRegistrar2;

    bytes32[] private applicantHashes;
    bytes32[] private winnerHashes;

    mapping(address => uint256) private submittedSeeds;
    uint256 public winnerCount;

    bool public lotteryCompleted;

    constructor(
        uint256 _winnerCount,
        address _primaryRegistrar,
        address _extraRegistrar1,
        address _extraRegistrar2
    ) {
        sebi = msg.sender;
        primaryRegistrar = _primaryRegistrar;
        extraRegistrar1 = _extraRegistrar1;
        extraRegistrar2 = _extraRegistrar2;
        winnerCount = _winnerCount;
    }

    // Modifiers
    modifier onlyPrimaryRegistrar() {
        require(msg.sender == primaryRegistrar, "Only primary registrar allowed");
        _;
    }

    modifier onlySeedSubmitter() {
        require(
            msg.sender == sebi ||
            msg.sender == extraRegistrar1 ||
            msg.sender == extraRegistrar2 ||
            msg.sender == primaryRegistrar,
            "Not authorized to submit seed"
        );
        _;
    }

    modifier lotteryNotDone() {
        require(!lotteryCompleted, "Lottery already completed");
        _;
    }

    // Applicant inputs
    function addHashedApplicant(bytes32 hashedDematId) external onlyPrimaryRegistrar lotteryNotDone {
        applicantHashes.push(hashedDematId);
    }

    function addMultipleHashedApplicants(bytes32[] calldata hashedDematIds) external onlyPrimaryRegistrar lotteryNotDone {
        for (uint256 i = 0; i < hashedDematIds.length; i++) {
            applicantHashes.push(hashedDematIds[i]);
        }
    }

    // Seed input
    function submitSeed(uint256 _seed) external onlySeedSubmitter lotteryNotDone {
        submittedSeeds[msg.sender] = _seed;
    }

    // Run lottery
    function runLottery() external onlyPrimaryRegistrar lotteryNotDone {
        require(
            submittedSeeds[sebi] != 0 &&
            submittedSeeds[primaryRegistrar] != 0 &&
            submittedSeeds[extraRegistrar1] != 0 &&
            submittedSeeds[extraRegistrar2] != 0,
            "All 4 seeds must be submitted"
        );

        uint256 finalSeed = uint256(
            keccak256(
                abi.encodePacked(
                    submittedSeeds[sebi],
                    submittedSeeds[primaryRegistrar],
                    submittedSeeds[extraRegistrar1],
                    submittedSeeds[extraRegistrar2],
                    block.timestamp
                )
            )
        );

        uint256 totalApplicants = applicantHashes.length;
        require(winnerCount <= totalApplicants, "Not enough applicants");

        bool[] memory selected = new bool[](totalApplicants);
        uint256 selectedCount = 0;

        while (selectedCount < winnerCount) {
            uint256 index = finalSeed % totalApplicants;

            if (!selected[index]) {
                winnerHashes.push(applicantHashes[index]);
                selected[index] = true;
                selectedCount++;
            }

            finalSeed = uint256(keccak256(abi.encodePacked(finalSeed)));
        }

        lotteryCompleted = true;
    }

    // Views
    function getAllApplicantHashes() external view returns (bytes32[] memory) {
        return applicantHashes;
    }

    function getWinnerHashes() external view returns (bytes32[] memory) {
        return winnerHashes;
    }

    function getApplicantCount() external view returns (uint256) {
        return applicantHashes.length;
    }

    function getWinnerCount() external view returns (uint256) {
        return winnerHashes.length;
    }
}
