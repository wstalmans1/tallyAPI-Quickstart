import { useQuery } from "@tanstack/react-query";
import { useGraphQLCodegen } from "../../autogen/useGraphQLCodegen";
var AccountType = /* @__PURE__ */ ((AccountType2) => {
  AccountType2["Eoa"] = "EOA";
  AccountType2["Safe"] = "SAFE";
  return AccountType2;
})(AccountType || {});
var AssignmentDirection = /* @__PURE__ */ ((AssignmentDirection2) => {
  AssignmentDirection2["In"] = "IN";
  AssignmentDirection2["Out"] = "OUT";
  return AssignmentDirection2;
})(AssignmentDirection || {});
var BlockExplorerType = /* @__PURE__ */ ((BlockExplorerType2) => {
  BlockExplorerType2["Blockscout"] = "blockscout";
  BlockExplorerType2["Etherscan"] = "etherscan";
  BlockExplorerType2["Other"] = "other";
  return BlockExplorerType2;
})(BlockExplorerType || {});
var CandidateSort = /* @__PURE__ */ ((CandidateSort2) => {
  CandidateSort2["Alphabetical"] = "ALPHABETICAL";
  CandidateSort2["Random"] = "RANDOM";
  CandidateSort2["Votes"] = "VOTES";
  return CandidateSort2;
})(CandidateSort || {});
var CloudEventType = /* @__PURE__ */ ((CloudEventType2) => {
  CloudEventType2["DelegationIsSeekingDelegationsToggle"] = "delegationIsSeekingDelegationsToggle";
  return CloudEventType2;
})(CloudEventType || {});
var ContenderFilter = /* @__PURE__ */ ((ContenderFilter2) => {
  ContenderFilter2["All"] = "ALL";
  ContenderFilter2["Qualified"] = "QUALIFIED";
  ContenderFilter2["SeekingVotes"] = "SEEKING_VOTES";
  return ContenderFilter2;
})(ContenderFilter || {});
var ContractType = /* @__PURE__ */ ((ContractType2) => {
  ContractType2["Fixedliquidstakingtoken"] = "fixedliquidstakingtoken";
  ContractType2["Liquidstakingtoken"] = "liquidstakingtoken";
  ContractType2["Other"] = "other";
  ContractType2["Staker"] = "staker";
  ContractType2["Unistaker"] = "unistaker";
  return ContractType2;
})(ContractType || {});
var ContributorsSortBy = /* @__PURE__ */ ((ContributorsSortBy2) => {
  ContributorsSortBy2["Id"] = "id";
  return ContributorsSortBy2;
})(ContributorsSortBy || {});
var DelegateChangedHistorySortBy = /* @__PURE__ */ ((DelegateChangedHistorySortBy2) => {
  DelegateChangedHistorySortBy2["BlockNumber"] = "blockNumber";
  DelegateChangedHistorySortBy2["Votes"] = "votes";
  return DelegateChangedHistorySortBy2;
})(DelegateChangedHistorySortBy || {});
var DelegateStatementSource = /* @__PURE__ */ ((DelegateStatementSource2) => {
  DelegateStatementSource2["Script"] = "script";
  DelegateStatementSource2["User"] = "user";
  return DelegateStatementSource2;
})(DelegateStatementSource || {});
var DelegateVotesChangedHistorySortBy = /* @__PURE__ */ ((DelegateVotesChangedHistorySortBy2) => {
  DelegateVotesChangedHistorySortBy2["BlockNumber"] = "blockNumber";
  DelegateVotesChangedHistorySortBy2["NetChange"] = "netChange";
  return DelegateVotesChangedHistorySortBy2;
})(DelegateVotesChangedHistorySortBy || {});
var DelegatesSortBy = /* @__PURE__ */ ((DelegatesSortBy2) => {
  DelegatesSortBy2["Delegators"] = "delegators";
  DelegatesSortBy2["Id"] = "id";
  DelegatesSortBy2["IsPrioritized"] = "isPrioritized";
  DelegatesSortBy2["Votes"] = "votes";
  return DelegatesSortBy2;
})(DelegatesSortBy || {});
var DelegationsSortBy = /* @__PURE__ */ ((DelegationsSortBy2) => {
  DelegationsSortBy2["Id"] = "id";
  DelegationsSortBy2["Votes"] = "votes";
  return DelegationsSortBy2;
})(DelegationsSortBy || {});
var EarningPowerTrackerEventType = /* @__PURE__ */ ((EarningPowerTrackerEventType2) => {
  EarningPowerTrackerEventType2["ClaimerAltered"] = "claimer_altered";
  EarningPowerTrackerEventType2["DelegateeAltered"] = "delegatee_altered";
  EarningPowerTrackerEventType2["Deposited"] = "deposited";
  EarningPowerTrackerEventType2["RewardClaimed"] = "reward_claimed";
  EarningPowerTrackerEventType2["Withdrawn"] = "withdrawn";
  return EarningPowerTrackerEventType2;
})(EarningPowerTrackerEventType || {});
var ElectionStatus = /* @__PURE__ */ ((ElectionStatus2) => {
  ElectionStatus2["Complete"] = "COMPLETE";
  ElectionStatus2["Grace"] = "GRACE";
  ElectionStatus2["Member"] = "MEMBER";
  ElectionStatus2["Nomination"] = "NOMINATION";
  return ElectionStatus2;
})(ElectionStatus || {});
var EligibilityStatus = /* @__PURE__ */ ((EligibilityStatus2) => {
  EligibilityStatus2["Claimed"] = "CLAIMED";
  EligibilityStatus2["Eligible"] = "ELIGIBLE";
  EligibilityStatus2["Noteligible"] = "NOTELIGIBLE";
  return EligibilityStatus2;
})(EligibilityStatus || {});
var ExecutableCallType = /* @__PURE__ */ ((ExecutableCallType2) => {
  ExecutableCallType2["Custom"] = "custom";
  ExecutableCallType2["Empty"] = "empty";
  ExecutableCallType2["Erc20transfer"] = "erc20transfer";
  ExecutableCallType2["Erc20transferarbitrum"] = "erc20transferarbitrum";
  ExecutableCallType2["Nativetransfer"] = "nativetransfer";
  ExecutableCallType2["Orcamanagepod"] = "orcamanagepod";
  ExecutableCallType2["Other"] = "other";
  ExecutableCallType2["Reward"] = "reward";
  ExecutableCallType2["Swap"] = "swap";
  return ExecutableCallType2;
})(ExecutableCallType || {});
var GnosisStatusChangeType = /* @__PURE__ */ ((GnosisStatusChangeType2) => {
  GnosisStatusChangeType2["Executed"] = "EXECUTED";
  GnosisStatusChangeType2["Submitted"] = "SUBMITTED";
  return GnosisStatusChangeType2;
})(GnosisStatusChangeType || {});
var GovernorKind = /* @__PURE__ */ ((GovernorKind2) => {
  GovernorKind2["Hub"] = "hub";
  GovernorKind2["Multiother"] = "multiother";
  GovernorKind2["Multiprimary"] = "multiprimary";
  GovernorKind2["Multisecondary"] = "multisecondary";
  GovernorKind2["Single"] = "single";
  GovernorKind2["Spoke"] = "spoke";
  return GovernorKind2;
})(GovernorKind || {});
var GovernorType = /* @__PURE__ */ ((GovernorType2) => {
  GovernorType2["Aave"] = "aave";
  GovernorType2["Governoralpha"] = "governoralpha";
  GovernorType2["Governorbravo"] = "governorbravo";
  GovernorType2["Hub"] = "hub";
  GovernorType2["Memberelection"] = "memberelection";
  GovernorType2["Nomineeelection"] = "nomineeelection";
  GovernorType2["Nounsfork"] = "nounsfork";
  GovernorType2["Openzeppelingovernor"] = "openzeppelingovernor";
  GovernorType2["Spoke"] = "spoke";
  return GovernorType2;
})(GovernorType || {});
var GovernorsSortBy = /* @__PURE__ */ ((GovernorsSortBy2) => {
  GovernorsSortBy2["Id"] = "id";
  return GovernorsSortBy2;
})(GovernorsSortBy || {});
var MetaTransactionAction = /* @__PURE__ */ ((MetaTransactionAction2) => {
  MetaTransactionAction2["CastVote"] = "CAST_VOTE";
  MetaTransactionAction2["Delegate"] = "DELEGATE";
  return MetaTransactionAction2;
})(MetaTransactionAction || {});
var MetaTransactionSortField = /* @__PURE__ */ ((MetaTransactionSortField2) => {
  MetaTransactionSortField2["Created"] = "CREATED";
  return MetaTransactionSortField2;
})(MetaTransactionSortField || {});
var NewVoteType = /* @__PURE__ */ ((NewVoteType2) => {
  NewVoteType2["Onchain"] = "onchain";
  NewVoteType2["Veto"] = "veto";
  return NewVoteType2;
})(NewVoteType || {});
var OrganizationMembersSortBy = /* @__PURE__ */ ((OrganizationMembersSortBy2) => {
  OrganizationMembersSortBy2["Id"] = "id";
  return OrganizationMembersSortBy2;
})(OrganizationMembersSortBy || {});
var OrganizationRole = /* @__PURE__ */ ((OrganizationRole2) => {
  OrganizationRole2["Admin"] = "ADMIN";
  OrganizationRole2["Member"] = "MEMBER";
  OrganizationRole2["Superadmin"] = "SUPERADMIN";
  return OrganizationRole2;
})(OrganizationRole || {});
var OrganizationsSortBy = /* @__PURE__ */ ((OrganizationsSortBy2) => {
  OrganizationsSortBy2["Explore"] = "explore";
  OrganizationsSortBy2["Id"] = "id";
  OrganizationsSortBy2["Name"] = "name";
  OrganizationsSortBy2["Popular"] = "popular";
  return OrganizationsSortBy2;
})(OrganizationsSortBy || {});
var ProposalActionType = /* @__PURE__ */ ((ProposalActionType2) => {
  ProposalActionType2["Cancel"] = "cancel";
  ProposalActionType2["Execute"] = "execute";
  ProposalActionType2["Queue"] = "queue";
  return ProposalActionType2;
})(ProposalActionType || {});
var ProposalEventType = /* @__PURE__ */ ((ProposalEventType2) => {
  ProposalEventType2["Activated"] = "activated";
  ProposalEventType2["Callexecuted"] = "callexecuted";
  ProposalEventType2["Canceled"] = "canceled";
  ProposalEventType2["Created"] = "created";
  ProposalEventType2["Crosschainexecuted"] = "crosschainexecuted";
  ProposalEventType2["Defeated"] = "defeated";
  ProposalEventType2["Drafted"] = "drafted";
  ProposalEventType2["Executed"] = "executed";
  ProposalEventType2["Expired"] = "expired";
  ProposalEventType2["Extended"] = "extended";
  ProposalEventType2["Pendingexecution"] = "pendingexecution";
  ProposalEventType2["Queued"] = "queued";
  ProposalEventType2["Succeeded"] = "succeeded";
  return ProposalEventType2;
})(ProposalEventType || {});
var ProposalParticipationType = /* @__PURE__ */ ((ProposalParticipationType2) => {
  ProposalParticipationType2["Notdelegate"] = "notdelegate";
  ProposalParticipationType2["Notvoted"] = "notvoted";
  ProposalParticipationType2["Unknown"] = "unknown";
  ProposalParticipationType2["Votedabstain"] = "votedabstain";
  ProposalParticipationType2["Votedagainst"] = "votedagainst";
  ProposalParticipationType2["Votedfor"] = "votedfor";
  return ProposalParticipationType2;
})(ProposalParticipationType || {});
var ProposalStatus = /* @__PURE__ */ ((ProposalStatus2) => {
  ProposalStatus2["Active"] = "active";
  ProposalStatus2["Archived"] = "archived";
  ProposalStatus2["Callexecuted"] = "callexecuted";
  ProposalStatus2["Canceled"] = "canceled";
  ProposalStatus2["Crosschainexecuted"] = "crosschainexecuted";
  ProposalStatus2["Defeated"] = "defeated";
  ProposalStatus2["Draft"] = "draft";
  ProposalStatus2["Executed"] = "executed";
  ProposalStatus2["Expired"] = "expired";
  ProposalStatus2["Extended"] = "extended";
  ProposalStatus2["Pending"] = "pending";
  ProposalStatus2["Pendingexecution"] = "pendingexecution";
  ProposalStatus2["Queued"] = "queued";
  ProposalStatus2["Submitted"] = "submitted";
  ProposalStatus2["Succeeded"] = "succeeded";
  ProposalStatus2["Vetoed"] = "vetoed";
  ProposalStatus2["Vetoquorummet"] = "vetoquorummet";
  ProposalStatus2["Vetovoteopen"] = "vetovoteopen";
  return ProposalStatus2;
})(ProposalStatus || {});
var ProposalsSortBy = /* @__PURE__ */ ((ProposalsSortBy2) => {
  ProposalsSortBy2["Id"] = "id";
  return ProposalsSortBy2;
})(ProposalsSortBy || {});
var Role = /* @__PURE__ */ ((Role2) => {
  Role2["Admin"] = "ADMIN";
  Role2["User"] = "USER";
  return Role2;
})(Role || {});
var RoundStatus = /* @__PURE__ */ ((RoundStatus2) => {
  RoundStatus2["Active"] = "ACTIVE";
  RoundStatus2["Complete"] = "COMPLETE";
  RoundStatus2["Executed"] = "EXECUTED";
  RoundStatus2["Pending"] = "PENDING";
  return RoundStatus2;
})(RoundStatus || {});
var SignInType = /* @__PURE__ */ ((SignInType2) => {
  SignInType2["Evm"] = "evm";
  SignInType2["Solana"] = "solana";
  SignInType2["Solanaledger"] = "solanaledger";
  return SignInType2;
})(SignInType || {});
var SimulationStatus = /* @__PURE__ */ ((SimulationStatus2) => {
  SimulationStatus2["Failed"] = "failed";
  SimulationStatus2["Success"] = "success";
  return SimulationStatus2;
})(SimulationStatus || {});
var SortOrder = /* @__PURE__ */ ((SortOrder2) => {
  SortOrder2["Asc"] = "ASC";
  SortOrder2["Desc"] = "DESC";
  return SortOrder2;
})(SortOrder || {});
var StakeEventType = /* @__PURE__ */ ((StakeEventType2) => {
  StakeEventType2["Deposit"] = "deposit";
  StakeEventType2["Staked"] = "staked";
  StakeEventType2["Unstaked"] = "unstaked";
  StakeEventType2["Withdraw"] = "withdraw";
  return StakeEventType2;
})(StakeEventType || {});
var StakeSortBy = /* @__PURE__ */ ((StakeSortBy2) => {
  StakeSortBy2["DepositId"] = "depositId";
  StakeSortBy2["Id"] = "id";
  return StakeSortBy2;
})(StakeSortBy || {});
var SupportType = /* @__PURE__ */ ((SupportType2) => {
  SupportType2["Abstain"] = "ABSTAIN";
  SupportType2["Against"] = "AGAINST";
  SupportType2["For"] = "FOR";
  return SupportType2;
})(SupportType || {});
var SwapOrderStatus = /* @__PURE__ */ ((SwapOrderStatus2) => {
  SwapOrderStatus2["Failed"] = "FAILED";
  SwapOrderStatus2["Fulfilled"] = "FULFILLED";
  SwapOrderStatus2["Pending"] = "PENDING";
  SwapOrderStatus2["PendingExecution"] = "PENDING_EXECUTION";
  return SwapOrderStatus2;
})(SwapOrderStatus || {});
var TimeInterval = /* @__PURE__ */ ((TimeInterval2) => {
  TimeInterval2["All"] = "ALL";
  TimeInterval2["Day"] = "DAY";
  TimeInterval2["Hour"] = "HOUR";
  TimeInterval2["Month"] = "MONTH";
  TimeInterval2["Quarter"] = "QUARTER";
  TimeInterval2["Week"] = "WEEK";
  TimeInterval2["Year"] = "YEAR";
  return TimeInterval2;
})(TimeInterval || {});
var TokenType = /* @__PURE__ */ ((TokenType2) => {
  TokenType2["Erc20"] = "ERC20";
  TokenType2["Erc20Aave"] = "ERC20AAVE";
  TokenType2["Erc721"] = "ERC721";
  TokenType2["Solanaspoketoken"] = "SOLANASPOKETOKEN";
  return TokenType2;
})(TokenType || {});
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2["Delegation"] = "delegation";
  return TransactionType2;
})(TransactionType || {});
var UnistakerTransactionStatus = /* @__PURE__ */ ((UnistakerTransactionStatus2) => {
  UnistakerTransactionStatus2["Failed"] = "failed";
  UnistakerTransactionStatus2["Indexed"] = "indexed";
  UnistakerTransactionStatus2["Pending"] = "pending";
  UnistakerTransactionStatus2["Timeout"] = "timeout";
  return UnistakerTransactionStatus2;
})(UnistakerTransactionStatus || {});
var UnistakerTransactionType = /* @__PURE__ */ ((UnistakerTransactionType2) => {
  UnistakerTransactionType2["Alterbeneficiary"] = "alterbeneficiary";
  UnistakerTransactionType2["Alterdelegatee"] = "alterdelegatee";
  UnistakerTransactionType2["Claimreward"] = "claimreward";
  UnistakerTransactionType2["Delete"] = "delete";
  UnistakerTransactionType2["Multicall"] = "multicall";
  UnistakerTransactionType2["Stake"] = "stake";
  UnistakerTransactionType2["Stakemore"] = "stakemore";
  UnistakerTransactionType2["Withdraw"] = "withdraw";
  return UnistakerTransactionType2;
})(UnistakerTransactionType || {});
var VoteType = /* @__PURE__ */ ((VoteType2) => {
  VoteType2["Abstain"] = "abstain";
  VoteType2["Against"] = "against";
  VoteType2["For"] = "for";
  VoteType2["Pendingabstain"] = "pendingabstain";
  VoteType2["Pendingagainst"] = "pendingagainst";
  VoteType2["Pendingfor"] = "pendingfor";
  return VoteType2;
})(VoteType || {});
var VotesSortBy = /* @__PURE__ */ ((VotesSortBy2) => {
  VotesSortBy2["Amount"] = "amount";
  VotesSortBy2["Id"] = "id";
  return VotesSortBy2;
})(VotesSortBy || {});
const GovernorsDocument = `
    query Governors($input: GovernorsInput!) {
  governors(input: $input) {
    nodes {
      ... on Governor {
        id
        name
        proposalStats {
          total
          active
        }
      }
    }
    pageInfo {
      count
    }
  }
}
    `;
const useGovernorsQuery = (variables, options) => useQuery({
  queryKey: ["Governors", variables],
  queryFn: useGraphQLCodegen(GovernorsDocument).bind(null, variables),
  ...options
});
export {
  AccountType,
  AssignmentDirection,
  BlockExplorerType,
  CandidateSort,
  CloudEventType,
  ContenderFilter,
  ContractType,
  ContributorsSortBy,
  DelegateChangedHistorySortBy,
  DelegateStatementSource,
  DelegateVotesChangedHistorySortBy,
  DelegatesSortBy,
  DelegationsSortBy,
  EarningPowerTrackerEventType,
  ElectionStatus,
  EligibilityStatus,
  ExecutableCallType,
  GnosisStatusChangeType,
  GovernorKind,
  GovernorType,
  GovernorsDocument,
  GovernorsSortBy,
  MetaTransactionAction,
  MetaTransactionSortField,
  NewVoteType,
  OrganizationMembersSortBy,
  OrganizationRole,
  OrganizationsSortBy,
  ProposalActionType,
  ProposalEventType,
  ProposalParticipationType,
  ProposalStatus,
  ProposalsSortBy,
  Role,
  RoundStatus,
  SignInType,
  SimulationStatus,
  SortOrder,
  StakeEventType,
  StakeSortBy,
  SupportType,
  SwapOrderStatus,
  TimeInterval,
  TokenType,
  TransactionType,
  UnistakerTransactionStatus,
  UnistakerTransactionType,
  VoteType,
  VotesSortBy,
  useGovernorsQuery
};
