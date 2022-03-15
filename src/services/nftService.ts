import artificialDatabase from "./../artificialDatabase/artificialDatabase.json";

import { Metadata } from "./../models/Metadata";
import { NFT } from "./../models/NFT";

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT as string;

class NFTService {
  getLimitedString(text: string, maxlength: number, lastSymbols: number, isBeautifulEnding: boolean = true, textMissingWarning?: string): string {
    if (text.length === 0 && textMissingWarning) {
      return textMissingWarning;
    }
  
    if (text.length <= maxlength) {
      return text;
    }
  
    if (lastSymbols) {
      return `${text.substring(0, maxlength)}...${text.substring(text.length - lastSymbols)}`;
    }
  
    let limitedString = text.substring(0, maxlength)
  
    if (isBeautifulEnding && !lastSymbols) {
      let lastSymbolsAfterSpace = limitedString.split(" ").slice(-1)[0];
  
      const isManyLastSymbols = (
        lastSymbolsAfterSpace.length === limitedString.length || 
        lastSymbolsAfterSpace.length >= limitedString.length/2
      );
      if (isManyLastSymbols) {
        return `${limitedString}...`;
      }
  
      const lengthLimitedString = limitedString.length;
      const lengthLastSymbolsAndSpace = lastSymbolsAfterSpace.length+1;
      const maxLengthForBeautifulText = lengthLimitedString - lengthLastSymbolsAndSpace;
      
      const limitedStringWithoutLastSymbols = limitedString.substring(0, maxLengthForBeautifulText);
      return `${limitedStringWithoutLastSymbols}...`;
    }
  
    return `${limitedString}...`;
  }

  setImageLimits(event: React.SyntheticEvent<HTMLImageElement>, maxSize: number): void {
    let image = event.target as HTMLImageElement;
    const scaleX = maxSize / image.width;
    const normalizedSizeY = image.width > image.height ? image.height * scaleX : image.width * scaleX;
    image.height = normalizedSizeY;
    image.setAttribute('style', 'display: inline');
  }

  getNFTFromBlockchain(walletAddress: string, signingClient: any, connectWallet: any): NFT[] {
    if (!signingClient || walletAddress.length === 0) {
      connectWallet();
      return [] as NFT[];
    }

    return signingClient
      .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
      .then((res: any) => {
        const manyMetadata: Promise<Metadata>[] = [];
        let EXCLUDE_LIST = [8];

        for (let i = 1; i <= res.count; i++) {
          if (!EXCLUDE_LIST.includes(i)) {
            manyMetadata.push(
              signingClient.queryContractSmart(PUBLIC_CW721_CONTRACT, {
                all_nft_info: { token_id: i + "" },
              })
            );
          }
        }

        Promise.all(manyMetadata)
          .then((manyMetadata) => {
            const manyNFT: NFT[] = manyMetadata.map((metadata, index) => {
              const decodedMetadata = JSON.parse(Buffer.from(metadata.info.token_uri.slice(30), "base64").toString());

              const newNFT: NFT = {
                id: index + 1,
                owner: metadata.access.owner,
                name: decodedMetadata.title,
                type: decodedMetadata.type,
                href: `/items/${index + 1}`,
                content: decodedMetadata.content || "https://dummyimage.com/404x404"
              };

              return newNFT;
            });

            return manyNFT;
          });
      })
      .catch((error: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Error signingClient.queryContractSmart() num_tokens: ${error}`)
        }
        return [] as NFT[];
      });
  }

  getNFTFromDatabase(): NFT[] {
    return artificialDatabase.data;
  }
}

export default new NFTService();
