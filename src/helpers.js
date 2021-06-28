const common = require("oci-common");
const dns = require("oci-dns");

/***
 * @returns {common.SimpleAuthenticationDetailsProvider} OCI Auth Details Provider
 ***/
 function getProvider(settings){
    return new common.SimpleAuthenticationDetailsProvider(
        settings.tenancyId,     settings.userId,
        settings.fingerprint,   settings.privateKey,
        null,                   common.Region.fromRegionId(settings.region)
    );
}

/*** 
 * @returns {dns.DnsClient}
***/
function getClient(settings){
    return new dns.DnsClient({
      authenticationDetailsProvider: getProvider(settings)
    });
}
  
module.exports = {
    getProvider,
    getClient
}