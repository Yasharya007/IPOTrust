// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IPOLottery {
    address public registrar;
    address public sebi;

    bytes32[] private applicantHashes;
    bytes32[] private winnerHashes;

    uint256 private registrarSeed;
    uint256 private sebiSeed;
    uint256 public winnerCount;

    bool public lotteryCompleted;

    constructor(uint256 _winnerCount, address _sebi) {
        registrar = msg.sender;
        sebi = _sebi;
        winnerCount = _winnerCount;
    }

    // Modifiers
    modifier onlyRegistrar() {
        require(msg.sender == registrar, "Only registrar allowed");
        _;
    }

    modifier onlySEBI() {
        require(msg.sender == sebi, "Only SEBI allowed");
        _;
    }

    modifier lotteryNotDone() {
        require(!lotteryCompleted, "Lottery already completed");
        _;
    }

    // Add a hashed DMAT ID (applicant)
    function addHashedApplicant(bytes32 hashedDematId) external onlyRegistrar lotteryNotDone {
        applicantHashes.push(hashedDematId);
    }
    // Add multiple hashed DMAT ID
    function addMultipleHashedApplicants(bytes32[] calldata hashedDematIds) external onlyRegistrar lotteryNotDone {
    for (uint256 i = 0; i < hashedDematIds.length; i++) {
        applicantHashes.push(hashedDematIds[i]);
        }
    }

    // Both parties submit seeds
    function submitRegistrarSeed(uint256 _seed) external onlyRegistrar lotteryNotDone {
        registrarSeed = _seed;
    }

    function submitSEBISeed(uint256 _seed) external onlySEBI lotteryNotDone {
        sebiSeed = _seed;
    }

    // Run the lottery (ONLY SEBI to ensure regulatory control)
    function runLottery() external onlySEBI lotteryNotDone {
        require(registrarSeed != 0 && sebiSeed != 0, "Both seeds must be submitted");

        uint256 finalSeed = uint256(
            keccak256(abi.encodePacked(registrarSeed, sebiSeed, block.timestamp))
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

    // Public read-only views
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
