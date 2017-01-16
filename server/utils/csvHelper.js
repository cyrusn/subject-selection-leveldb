const Combination = require('../../json/combination');
// const OleSubjects = require('../../json/oles');
const _ = require('lodash');

// convert the subjects in combo to string,
// e.g. ["va", "phy"] => "va+phy"
// leesei: why do lookup by id here? caller doing lookup and passing a combo object is better
// it allows this function to be used in a map chain
const getComboById = comboID => _.find(Combination, {id: comboID});
const combo2Key = (connector, comboObject) => comboObject.subjects.join(connector);

// convert array of combination ids to
// object with {'combination string': priority}
// the return value is the priority with starting index 1
const convertCombosArrayToObject = combos => combos
  .map((id, index) => ({[combo2Key('+', getComboById(id))]: index + 1}));

// convert array of ole ids to
// object with {'ole string': priority}
// the return value is the priority with starting index 1
// const convertOlesArrayToObjectoles = oles => oles
//   .map((id, index) => ({[OleSubjects[id].name]: index + 1}));

// module.exports = {getComboById, combo2Key, convertCombosArrayToObject, convertOlesArrayToObjectoles};
module.exports = {getComboById, combo2Key, convertCombosArrayToObject};
