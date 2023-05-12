const CW721_CODE_ID = process.env.NEXT_PUBLIC_CW721_CODE_ID;

export async function findUserCollections(walletAddress, signingClient) {
  const response = await signingClient.getContracts(CW721_CODE_ID);
  const userCollectionArray = [];

  for (const address of response) {
    const result = await signingClient.getContract(address);
    console.log(result);
    if (result.admin == walletAddress) {
      // TODO: There may be a feature where the user can query the instantiated contract by him only, to reduce the response.
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

export function getCollectionDataHibridV2(walletAddress, signingClient) {
  // not used yet but could be more efficient
  return signingClient.getContracts(CW721_CODE_ID).then((response) => {
    const userCollections = response.filter(
      (address) => signingClient.getContract(address).admin === walletAddress
    );
    return Promise.all(
      userCollections.map((address) =>
        signingClient
          .queryContractSmart(address, { contract_info: {} })
          .then((result) => ({ ...result, address }))
      )
    );
  });
}
