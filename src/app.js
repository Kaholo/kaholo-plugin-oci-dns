// JavaScript
const dns = require("oci-dns")

const { listCompartments } = require('./autocomplete');
const { getClient } = require('./helpers');
const parsers = require('./parsers');

async function createZone(action, settings) {
  const client = getClient(settings);
  const createZoneRequest = {
    compartmentId: parsers.autocomplete(action.params.compartment),
    createZoneDetails: {
      name: parsers.string(action.params.name),
      scope: action.params.scope || "PUBLIC",
      zoneType: action.params.zoneType || "PRIMARY"
    },
    scope: action.params.scope || "PUBLIC"
  };
  if (action.params.zoneType == "SECONDRY"){
    createZoneRequest.createZoneDetails.externalMasters = action.params.externalMasters;
    if (!Array.isArray(action.params.externalMasters)){
      throw "External Masters must be an array of objects";
    }
  }
  return client.createZone({createZoneRequest});
}

async function updateDomainRecords(action, settings) {
  const client = getClient(settings);
  const updateZoneRecordsRequest = {
    compartmentId: parsers.autocomplete(action.params.compartment),
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
  listCompartments,
}

