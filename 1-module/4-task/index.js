function checkSpam(str) {
  let lowerCaseStr = str.toLowerCase();
  if (lowerCaseStr.includes('1xbet') || lowerCaseStr.includes('xxx')) return true;
  else return false;
}
