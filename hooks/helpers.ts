export  const  replaceIp =(url:string, newIp:string) =>{
    const updatedUrl = url.replace(/https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/, (match, ip) => {
        return match.replace(ip, newIp);
    });
    return updatedUrl;
}



export const isValidCardNumber = (cardNumber: string): boolean => {
    const cleanCardNumber = cardNumber.replace(/\D/g, "")
  
    if (cleanCardNumber.length !== 16) {
      return false
    }
  
    let sum = 0
    let alternate = false
    for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
      let n = Number.parseInt(cleanCardNumber[i])
      if (alternate) {
        n *= 2
        if (n > 9) {
          n -= 9
        }
      }
      sum += n
      alternate = !alternate
    }
  
    return sum % 10 === 0
  }
  
  