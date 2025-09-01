import { gql } from 'graphql-request'

// Core queries for Tally API integration
export const GET_GOVERNORS_BY_ORG = gql`
  query GetGovernorsByOrg($input: GovernorsInput!) {
    governors(input: $input) {
      nodes {
        ... on Governor {
          id
          chainId
          name
          slug
          kind
          type
          isIndexing
          isBehind
          organization {
            id
            name
            slug
          }
          proposalStats {
            total
            active
            failed
            passed
          }
          parameters {
            quorumVotes
            proposalThreshold
            votingDelay
            votingPeriod
            quorumNumerator
            quorumDenominator
          }
          quorum
          token {
            id
            name
            symbol
            decimals
          }
          delegatesCount
          delegatesVotesCount
          tokenOwnersCount
          contracts {
            governor {
              address
              type
            }
          }
        }
      }
      pageInfo {
        firstCursor
        lastCursor
        count
      }
    }
  }
`

export const GET_PROPOSALS_BY_ORG = gql`
  query GetProposalsByOrg($input: ProposalsInput!) {
    proposals(input: $input) {
      nodes {
        ... on Proposal {
          id
          onchainId
          status
          metadata { 
            title 
            eta 
          }
          governor { 
            id 
            name 
            chainId 
          }
          organization { 
            id 
            name 
          }
          voteStats {
            type
            votesCount
            votersCount
            percent
          }
        }
      }
      pageInfo {
        firstCursor
        lastCursor
        count
      }
    }
  }
`

export const GET_PROPOSAL_DETAIL = gql`
  query GetProposalDetail($input: ProposalInput!) {
    proposal(input: $input) {
      id
      onchainId
      status
      metadata {
        title
        description
        eta
      }
      governor {
        id
        name
        chainId
        token {
          id
          name
          symbol
          decimals
        }
        contracts {
          governor {
            address
            type
          }
        }
        organization {
          id
          name
        }
      }
      organization {
        id
        name
      }
      voteStats {
        type
        votesCount
        votersCount
        percent
      }
      createdAt
    }
  }
`

export const GET_DELEGATES = gql`
  query GetDelegates($governorId: String!, $first: Int = 20, $skip: Int = 0) {
    delegates(
      where: { governor: $governorId }
      first: $first
      skip: $skip
      orderBy: votingPower
      orderDirection: desc
    ) {
      id
      address
      votingPower
      proposalVotes {
        id
        support
        weight
      }
    }
  }
`
