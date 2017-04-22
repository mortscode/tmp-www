export default function avoidOrphan(elem) {
  const last = elem.lastChild;
  const windowWidth = window.innerWidth;
  let trimmed;
  let wordArray;
  let wordCount;

  // On mobile, do not apply ophan rule to paragraph tags. It looks funny.
  if (windowWidth < 900) {
    return;
  }

  if (last && (last.nodeType === 3)) {
    trimmed = last.nodeValue.trim();
    wordArray = trimmed.match(/\S+/g);
    wordCount = wordArray ? wordArray.length : 0;

    if (wordCount > 3) {
      last.nodeValue = trimmed.replace(/\s+([^\s]+\s*)$/g, '\xA0$1');
    }
  }
}
