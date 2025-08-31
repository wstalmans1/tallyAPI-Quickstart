import { useQuery } from "./useQuery";
import { ProposalTable } from "../RawQuery/Proposals";

export const PolygonProposals = ({ organizationId }) => {
    const ProposalsDocument = `#graphql
  
      query Proposals($input: ProposalsInput!) {
    proposals(input: $input) {
      nodes {
        ... on Proposal {
          id
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
      }
    }
  }
      `;
  
    const { data, isLoading } = useQuery({
      query: ProposalsDocument,
      variables: {
        input: {
          filters: {
            organizationId: organizationId,
          },
          page: { limit: 8 },
          sort: { sortBy: "id", isDescending: true },
        },
      },
    });
  
        const { nodes: proposals } = data?.proposals ?? { nodes: [] };

  if (isLoading)
    return (
      <div className="tableLoading">
        <b>loading...</b>
      </div>
    );

  if (!proposals || proposals.length === 0) {
    return (
      <div className="governorList">
        <h2>Organization Proposals (React Query)</h2>
        <div className="no-data-message">
          <p>No proposals found or data is still loading.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="governorList">
      <h2>Organization Proposals (React Query)</h2>
      <ProposalTable proposals={proposals}></ProposalTable>
    </div>
  );
  };
  
  