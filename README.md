# kaholo-plugin-oci-dns
Kaholo plugin for integration with Oracle Cloud Infrastructure DNS service. This method is using the following [API](https://docs.oracle.com/en-us/iaas/api/#/en/dns/20180115/).

## Settings
1. Private Key (Vault) **Required** - Will be used to authenticate to the OCI API. Can be taken from Identity\Users\YOUR_USER\API keys.
2. User ID (String) **Required** - The OCID of the user to authenticate with.
3. Tenancy ID (String) **Required** - Tenancy OCID. Can be found in user profile.
4. Fingerprint (Vault) **Required** -  Will be used to authenticate to the OCI API. Can be taken from Identity\Users\YOUR_USER\API keys.
5. Region (String) **Required** - Identifier of the region to create the requests in. 

## Method Create Zone
Creates a new zone in the specified compartment. This method is using the following [method](https://docs.oracle.com/en-us/iaas/api/#/en/dns/20180115/Zone/CreateZone) from the OCI SDK.

### Parameters
1. Compartment (Autocomplete String) **Required** - The ID of the compartment to create the new zone in.
2. Domain Name (String) **Required** - The name of the domain of the new zone. For example: www.example.com
3. Scope (Options) **Optional** - The scope of the new zone. Can be Private\Public. Default value Public.
4. Private View of VCN(Autocomplete) **Optional** - The vcn to get it's default private dns view. Only for Private DNS zones. 
4. Zone Type (Options) **Optional** - The type of the new zone. Can be either Primary or Secondary. Default is Primary.
6. External Masters (Array of Objects) **Optional** - Required only for secondary zones. External master servers for the zone.
Can find more on the external master object in [here](https://docs.oracle.com/en-us/iaas/api/#/en/dns/20180115/datatypes/ExternalMaster).

## Method Update Zone Records
Replaces records in the specified zone with the records specified in the request body. If a specified record does not exist, it will be created. If the record exists, then it will be updated to represent the record in the body of the request. If a record in the zone does not exist in the request body, the record will be removed from the zone. This method is using the following [method](https://docs.oracle.com/en-us/iaas/api/#/en/dns/20180115/Records/UpdateZoneRecords) from the OCI SDK.

### Parameters
1. Compartment (Autocomplete String) **Required** - The ID of the compartment of the zone.
2. Zone Name or ID (String) **Required** - The name or the ID of the zone
3. Scope (Options) **Optional** - The scope of the zone. Can be Private\Public. Default value Public.
4. Record Items (Array of Objects) **Required** - The record items to update. You can find more on record objects [here](https://docs.oracle.com/en-us/iaas/api/#/en/dns/20180115/datatypes/RecordDetails).

