// holochain ambient type defs for API

declare function property(name: string): string;
declare function makeHash (entryType: string, entryData: any): holochain.Hash;
declare function debug(value: any): void;
declare function call(zomeName: string, functionName: string, arguments: string | object): any;
declare function bridge(appDNAHash: holochain.Hash, zomeName: string, functionName: string, arguments: string | object): any;
declare function getBridges(): holochain.BridgeStatus[];
declare function sign(doc: string): string;
declare function verifySignature(signature: string, data: string, pubKey: string): boolean;
declare function commit(entryType: string, entryData: string | object): holochain.Hash;
declare function get(hash: holochain.Hash, options?: object): holochain.GetResponse | any;
declare function getLinks(base: holochain.Hash, tag: string, options?: object): holochain.GetLinksResponse[];
declare function update(entryType: string, entryData: string | object, replaces: holochain.Hash): holochain.Hash;
declare function updateAgent(options: object): holochain.Hash;
declare function remove(entryHash: holochain.Hash, message: string): holochain.Hash;
declare function query(options?: object): holochain.QueryResponse[] | any[];
declare function send(to: holochain.Hash, message: object, options?: object): any;
declare function bundleStart(timeout: number, userParam: any): void;
declare function bundleClose(commit: boolean): void;
 
declare var HC: holochain.HolochainSystemGlobals;
declare var App: holochain.HolochainAppGlobals;


declare namespace holochain {
	type Hash = string;
	type Signature = string;
	type HolochainError = object;
	type PackageRequest = object;


	interface Header {
	  Type: string;
	  Time: string;
	  HeaderLink: Hash;
	  EntryLink: Hash;
	  TypeLink: Hash;
	  Sig: Signature;
	  Change: Hash;
	}

	interface GetResponse {
	  Entry?: any;
	  EntryType?: string;
	  Sources?: Hash[];
	}

	interface GetLinksResponse {
	  Hash: Hash;
	  Entry?: any;
	  EntryType?: string;
	  Tag?: string;
	  Source?: Hash;
	}

	interface QueryResponse {
	  Hash?: string
	  Entry?: any
	  Header?: Header
	}

	interface BridgeStatus {
	  Side: number;
	  CalleeName?: string;
	  CalleeApp?: Hash;
	  Token?: string;
	}


	/*=====  End of Holochain Data Types  ======*/


	interface HolochainSystemGlobals {
	  Version: string;
	  HashNotFound: any;
	  Status: any;
	  GetMask: any;
	  LinkAction: any;
	  PkgReq: any;
	  Bridge: any;
	  SysEntryType: any;
	  BundleCancel: any;
	}

	interface HolochainAppGlobals {
	  Name: string;
	  DNA: {
	    Hash: Hash;
	  };
	  Key: {
	    Hash: Hash;
	  }
	  Agent: {
	    Hash: Hash;
	    TopHash: Hash;
	    String: string;
	  }
	}
}