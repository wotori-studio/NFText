class NFT {
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
}

export default new NFT();