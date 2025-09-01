// Barrel exports for Tally integration
export { tallyClient } from './client'
export { 
  GET_GOVERNORS_BY_ORG, 
  GET_PROPOSALS_BY_GOVERNOR, 
  GET_PROPOSAL_DETAIL,
  GET_DELEGATES 
} from './queries'
export { 
  tallyKeys,
  useGovernorsByOrg,
  useProposalsByGovernor,
  useProposalDetail,
  useDelegates,
  useInvalidateTallyQueries
} from './hooks'
