// TODO: Add tests

import { ArrayHelper } from "./arrayHelper";

export class URLBuilder {
  private base: URL;

  static random(): URLBuilder {
    return new URLBuilder(_randomUrl());
  }

  constructor(base: string | URL) {
    this.base = new URL(base);
  }

  build(): URL {
    this.normalizeBaseUrl();
    return new URL(this.base);
  }

  setPath(path: string): URLBuilder {
    this.base.pathname = path;
    return this;
  }

  appendPath(path: string): URLBuilder {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    this.normalizeBaseUrl();
    if (this.base.pathname == "/") {
      // If the path is empty, simply set it to the new path component
      // IMPORTANT: This prevents creating a "//" path, since URL.pathname
      // returns "/" by default when the path is empty.
      this.base.pathname = path;
    } else {
      // Otherwise, append the component to the existing path
      this.base.pathname = this.base.pathname + path;
    }
    return this;
  }

  clearPath(): URLBuilder {
    this.base.pathname = "";
    return this;
  }

  setQueryParam(name: string, value: any): URLBuilder {
    this.base.searchParams.set(name, value ? value.toString() : "");
    return this;
  }

  removeQueryParam(name: string): URLBuilder {
    this.base.searchParams.delete(name);
    return this;
  }

  clearQueryParams(): URLBuilder {
    this.base.search = "";
    return this;
  }

  private normalizeBaseUrl() {
    URLBuilder.removeTrailingSlash(this.base);
  }

  private static removeTrailingSlash(url: URL) {
    if (url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
  }
}

function _randomUrl(): URL {
  const scheme = ArrayHelper.sample(_schemes);
  const host = ArrayHelper.sample(_hosts);
  const tld = ArrayHelper.sample(_tlds);
  return new URL(`${scheme}://${host}.${tld}`);
}

const _schemes = ["http", "https"];

const _hosts = [
  "example",
  "violet",
  "etherscan",
  "aave",
];

const _tlds = [
  "com",
  "net",
  "org",
  "io",
  "co",
];
