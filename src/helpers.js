const common = require("oci-common");
const dns = require("oci-dns");

function getProvider(settings){
    return new common.SimpleAuthenticationDetailsProvider(
        settings.tenancyId,     settings.userId,
        settings.fingerprint,   settings.privateKey,
        null,                   settings.region
    );
}

/*
 * @return {dns.DnsClient}
*/
function getClient(settings){
    return new dns.DnsClient({
      authenticationDetailsProvider: getProvider(settings)
    });
}
  
module.exports = {
    getProvider,
    getClient
}