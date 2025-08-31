import "./../App.css";
import { useGovernorsQuery } from "./hooks";

export const Governors = ({ organizationId }) => {
  const chainIds = ["eip155:1"];

  // The generated hook below encapsulates react-query to return the query response data,
  // along with errors and important states like isLoading and isSuccess.
  // You can learn more about this here: https://react-query-v3.tanstack.com/guides/queries

  const { data, isLoading } = useGovernorsQuery({
    input: {
      filters: {
        organizationId: organizationId,
      },
      page: { limit: 8 },
      sort: { sortBy: "id", isDescending: true },
    },
  });

  const { nodes: governors } = data ?? { nodes: [] };

  // Debug logging
  console.log('Governors component:', { organizationId, data, governors, isLoading });

  if (isLoading)
    return (
      <div className="tableLoading">
        <b>loading...</b>
      </div>
    );

  if (!governors || governors.length === 0) {
    return (
      <div className="governorList">
        <h2>Organization Governors</h2>
        <div className="no-data-message">
          <p>No governors found in this organization.</p>
          <p>Organization ID: {organizationId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="governorList">
      <h2>Organization Governors</h2>
      <GovernorsTable governors={governors}></GovernorsTable>
    </div>
  );
};

const GovernorsTable = ({ governors }) => {
  return (
    <table className="styledTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Chain</th>
          <th>Total Proposals</th>
          <th>Active Proposals</th>
        </tr>
      </thead>
      <tbody>
        {governors.map((governor, index) => {
          let chainName = governor.chainId;
          if (governor.chainId === "eip155:137") chainName = "Polygon";
          else if (governor.chainId === "eip155:11155111") chainName = "Sepolia Testnet";
          else if (governor.chainId === "eip155:1") chainName = "Ethereum Mainnet";

          return (
            <tr key={`governor-row-${index}`}>
              <td>{governor.name}</td>
              <td>{chainName}</td>
              <td>{governor.proposalStats?.total || 0}</td>
              <td>{governor.proposalStats?.active || 0}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
