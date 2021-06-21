const { getClient } = require('./helpers');
const parsers = require('./parsers');

async function createZone(action, settings) {
  const client = getClient(settings);
  let externalMasters;
  if (action.params.zoneType == "SECONDRY"){
    externalMasters = action.params.externalMasters;
    if (externalMasters && !Array.isArray(externalMasters)){
      throw "External Masters must be an array of objects";
    }
  }
  let viewId;
  const vcn = action.params.vcn;
  if (vcn){
    const views = (await client.listViews({
        compartmentId: parsers.autocomplete(action.params.compartment) || settings.tenancyId,
        scope: "PRIVATE"
    })).items;
    viewId = views.find(view => view.displayName === vcn.value ? vcn.value : vcn).id;
  }

  return client.createZone({
    createZoneDetails: {
      name: parsers.string(action.params.name),
      scope: action.params.scope || "GLOBAL",
      zoneType: action.params.zoneType || "PRIMARY",
      compartmentId: parsers.autocomplete(action.params.compartment) || settings.tenancyId,
      externalMasters: externalMasters,
      viewId: viewId
    },
    scope: action.params.scope || "GLOBAL",
    viewId: viewId
  });
}

async function updateDomainRecords(action, settings) {
  const client = getClient(settings);
  const updateZoneRecordsRequest = {
    compartmentId: parsers.autocomplete(action.params.compartment) || settings.tenancyId,
    zoneNameOrId: parsers.string(action.params.zone),
    updateZoneRecordsDetails: { items: [parsers.array(action.params.records)] },
    scope: action.params.scope || "PUBLIC",
  };
  return client.updateZoneRecords(updateZoneRecordsRequest);
}

module.exports = {
  createZone,
  updateDomainRecords,
  //autocomplete
  ...require('./autocomplete')
}

