export async function findUserCollections(walletAddress, signingClient) {
  const response = await signingClient.getContracts(633);
  const userCollectionArray = [];

  for (const address of response) {
    const result = await signingClient.getContract(address);
    if (result.admin == walletAddress) {
      userCollectionArray.push(result.address);
    }
  }

  return userCollectionArray;
}

export async function findCollectionsData(collectionsAddresses, signingClient) {
  const data = [];

  for (const address of collectionsAddresses) {
    const result = await signingClient.queryContractSmart(address, {
      contract_info: {},
    });
    result["address"] = address;
    data.push(result);
  }

  return data;
}

export async function getCollectionDataHibrid(walletAddress, signingClient) {
  // to make this work faster this could be done in one single thread with .then(... .then(...)) combining two functions in on
  // check previous revision of this file, where there is no async realisation
  const userCollections = await findUserCollections(
    walletAddress,
    signingClient
  );
  const collectionData = await findCollectionsData(
    userCollections,
    signingClient
  );
  return collectionData;
}