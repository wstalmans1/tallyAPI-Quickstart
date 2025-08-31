import { useEffect, useState } from "react";
import { fetcher } from "./fetcher";

export const Proposals = ({ organizationId }) => {
  const [proposals, setProposals] = useState(undefined);
  const ProposalsDocument =
   `query Proposals($input: ProposalsInput!) {
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
      `;

  useEffect(() => {
    // Reset proposals to undefined to show loading state
    setProposals(undefined);
    
    fetcher({
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
    }).then((data) => {
      const { nodes: proposals } = data?.proposals ?? { nodes: [] };
      setProposals(proposals);
    });
  }, [organizationId]);

  if (!proposals)
    return (
      <div className="tableLoading">
        <b>loading...</b>
      </div>
    );

  return (
    <div className="governorList">
      <h2>Organization Proposals</h2>
              {proposals && proposals.length > 0 ? (
          <ProposalTable proposals={proposals}></ProposalTable>
        ) : (
          <div className="no-data-message">
            <p>No proposals found in this organization.</p>
          </div>
        )}
    </div>
  );
};

export const ProposalTable = ({ proposals }) => {
  return (
    <table className="styledTable">
      <thead>
        <tr>
          <th style={{ width: "50%" }}>Title</th>
          <th style={{ width: "25%" }}>Governor</th>
          <th style={{ width: "25%" }}>Votes For (%)</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((proposal, index) => {
          // Find the "for" vote type
          const forVote = proposal.voteStats?.find(vote => vote.type === "for");
          const forPercent = forVote?.percent?.toFixed() || "N/A";
          const title = proposal.metadata?.title || "No title";

          return (
            <tr key={`proposal-row-${index}`}>
              <td style={{ 
                maxWidth: "0", 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap",
                paddingRight: "10px",
                cursor: "help"
              }} title={title}>
                {title}
              </td>
              <td>{proposal.governor?.name || "Unknown"}</td>
              <td>{forPercent}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
