const core = require("oci-core")
const identity = require("oci-identity");
const { getProvider } = require('./helpers');
const parsers = require("./parsers")

// auto complete helper methods

function mapAutoParams(autoParams){
  const params = {};
  autoParams.forEach(param => {
    params[param.name] = parsers.autocomplete(param.value);
  });
  return params;
}

function handleResult(result, query){
  let items = result.items;
  if (items.length === 0) return [];
  items = items.map(item => ({
    id: item.id,
    value:  item.displayName ? item.displayName : 
            item.name ? item.name : item.id
  }));

  if (!query) return items;
  query = query.split(" ");
  return items.filter(item => query.every(qWord => 
    item.value.toLowerCase().includes(qWord.toLowerCase())
  ));
}
 
// main auto complete methods

async function listCompartments(query, pluginSettings) {
  const settings = mapAutoParams(pluginSettings);
  const tenancyId = settings.tenancyId;
  const provider = getProvider(settings);
  const identityClient = await new identity.IdentityClient({
    authenticationDetailsProvider: provider
  });
  const request = { compartmentId: tenancyId };
  const result = await identityClient.listCompartments(request);
  return handleResult(result, query);
}

async function listVCN(query, pluginSettings, pluginActionParams) {
    /**
     * This method will return all VCN
     */
    const settings = mapAutoParams(pluginSettings), params = mapAutoParams(pluginActionParams);
    const compartmentId = params.compartment || settings.tenancyId;
    const provider = getProvider(settings);
    const virtualNetworkClient = new core.VirtualNetworkClient({
      authenticationDetailsProvider: provider
    });
 
    const request = {compartmentId};
    const result = await virtualNetworkClient.listVcns(request);
    return handleResult(result, query, "id", "displayName");
}

module.exports = {
  listCompartments,
  listVCN
}
