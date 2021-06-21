const fs = require("fs");
const common = require("oci-common");
const dns = require("oci-dns");

function createConfigFile(settings){
    const configPath = `${__dirname}/.oci`;
    // Create pem file
    const pemPath = `${__dirname}/kaholo.pem`;
    let pem = settings.privateKey;
    pem = pem.replace(/-----BEGIN PRIVATE KEY-----/g,'' )
    pem = pem.replace(/-----END PRIVATE KEY-----/g,'');
    pem = pem.replace(/ /g,'\n');
    pem = "-----BEGIN PRIVATE KEY-----\n"+pem+"-----END PRIVATE KEY-----"
    fs.writeFileSync(pemPath, pem);
    // Create OCI file
    const content = `[DEFAULT]
    user=${settings.userId}
    fingerprint=${settings.fingerprint}
    tenancy=${settings.tenancyId}
    region=${settings.region}
    key_file=${pemPath}`;
    fs.writeFileSync(configPath, content);
}

function getProvider(settings){
    const configPath = `${__dirname}/.oci`;
    if (!fs.existsSync(configPath)){
        createConfigFile(settings);
    }
    // Create provider from oci file
    return new common.ConfigFileAuthenticationDetailsProvider(
        configPath,
        "DEFAULT"
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