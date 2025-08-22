export default function ClipURL(url) {
  if (!url || typeof url !== "string") return "";

  let input = url.trim();

  // Ensure input is a valid URL string for parsing
  if (!/^https?:\/\//i.test(input)) {
    input = "https://" + input;
  }

  try {
    const hostname = new URL(input).hostname; // e.g. "mail.yahoo.co.uk"
    const withoutWWW = hostname.replace(/^www\./i, ""); // remove www.

    const parts = withoutWWW.split(".");

    // If domain is like "mail.yahoo.co.uk"
    // take the second last part => "yahoo"
    let main_name = parts.length > 2 ? parts[parts.length - 2] : parts[0];

    return main_name.toUpperCase();
  } catch (e) {
    // fallback for plain words like "Google"
    return url.split(/[ .]/)[0].toUpperCase();
  }
}
