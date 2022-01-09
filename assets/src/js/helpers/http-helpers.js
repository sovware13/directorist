const httpHelpers = {
  jsonToQueryString: json => {
    let string = "?";

    if (!json || Array.isArray(json)) {
      return string;
    }

    if (typeof json !== "object") {
      return string;
    }

    for (const key of Object.keys(json)) {
      string += key + "=" + json[key] + "&";
    }

    return string;
  }
};

export default httpHelpers;
