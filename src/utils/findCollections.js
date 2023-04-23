export async function findUserCollections(walletAddress, signingClient) {
  console.log("find...");
  let userCollectionArray = [];
  // get all instances of 633 code with CW721
  signingClient.getContracts(633).then((response) => {
    response.map((address, i) => {
      // get all detailed information of each address
      signingClient.getContract(address).then((result) => {
        if (result.admin == walletAddress) {
          userCollectionArray.push(result.address);
        }
      });
    });
  });
  console.log("current user own this collections: ", userCollectionArray);
  return userCollectionArray;
}

export async function findCollectionsData(collectionsAddresses, signingClient) {
  let data = [];
  console.log("find...", collectionsAddresses);
  collectionsAddresses.map((address) => {
    signingClient
      .queryContractSmart(address, { contract_info: {} })
      .then((result) => {
        result["address"] = address;
        data.push(result);
      });
  });
  console.log(data);
  return data;
}

export async function getCollectionDataHibrid(walletAddress, signingClient) {
  let data = await findUserCollections(walletAddress, signingClient);
  console.log(`!!!!FIND ALL CONTRACTS for ${walletAddress}:`, data);
  let out = await findCollectionsData(data, signingClient);
  console.log("GET COLLECTION DATA!", out);
  return out;
}
