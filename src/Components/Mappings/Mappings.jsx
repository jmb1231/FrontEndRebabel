import React, { useState } from "react";
import styles from "./Mappings.module.css";
import MappingsTable from "./MappingsTable.jsx";

function Mappings({ isOpen, onClose, data, setData, errors, setErrorState }) {
  const [isAddTypeMappingOpen, setAddTypeMappingOpen] = useState(false);
  const [isAddFeatureMappingOpen, setAddFeatureMappingOpen] = useState(false);
  const [inType, setInType] = useState("");
  const [outType, setOutType] = useState("");
  const [inFeature, setInFeature] = useState("");
  const [outFeature, setOutFeature] = useState("");

  const typeMappings = data.mappings[0];
  const featureMappings = data.mappings[1];

  function handleInputChanges(e) {
    if (e.target.name === "in_type") {
      setInType(e.target.value);
    } else if (e.target.name === "out_type") {
      setOutType(e.target.value);
    } else if (e.target.name === "in_feature") {
      setInFeature(e.target.value);
    } else {
      setOutFeature(e.target.value);
    }
  }

  function handleRemoveMapping(mappingTypeIndex, mappingIndex) {
    const newMappings = data.mappings[mappingTypeIndex].filter(
      (_, i) => i !== mappingIndex
    );
    data.mappings[mappingTypeIndex] = newMappings;
    if (!data.mappings[0].length && !data.mappings[1].length) {
      setErrorState(true, "Mappings must be provided", "mappings");
    }
    setData((data) => ({ ...data }));
  }

  function resetDialog(mappingTypeIndex, isSubmit) {
    if (isSubmit) {
      setErrorState(false, "", "mappings");
    }

    if (mappingTypeIndex) {
      setAddFeatureMappingOpen(false);
      setInFeature("");
      setOutFeature("");
    } else {
      setAddTypeMappingOpen(false);
      setInType("");
      setOutType("");
    }
  }

  const typeDialog = (
    <dialog open={isAddTypeMappingOpen}>
      <article>
        <h2>Type Mapping</h2>
        <hr></hr>
        <div className={styles.inputsContainer}>
          <div>
            <label>In Type</label>
            <input
              name="in_type"
              type="text"
              value={inType}
              onChange={(e) => handleInputChanges(e)}
              aria-label="In type settings"
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Out Type</label>
            <input
              name="out_type"
              type="text"
              value={outType}
              onChange={(e) => handleInputChanges(e)}
              aria-label="Out type settings"
            />
          </div>
        </div>
        <footer>
          <button
            onClick={() =>
              data.mappings[0].push({ in_type: inType, out_type: outType }) &&
              resetDialog(0, true)
            }
          >
            Submit
          </button>
          <button onClick={() => resetDialog(0, false)}>Cancel</button>
        </footer>
      </article>
    </dialog>
  );

  const featureDialog = (
    <dialog open={isAddFeatureMappingOpen}>
      <article>
        <h2>Feature Mapping</h2>
        <hr></hr>
        <div className={styles.inputsContainer}>
          <div>
            <label>In Feature</label>
            <input
              name="in_feature"
              type="text"
              value={inFeature}
              onChange={(e) => handleInputChanges(e)}
              aria-label="In feature settings"
            />
          </div>
          <div>
            <label>Out Feature</label>
            <input
              name="out_feature"
              type="text"
              value={outFeature}
              onChange={(e) => handleInputChanges(e)}
              aria-label="Out feature settings"
            />
          </div>
        </div>
        <footer>
          <button
            onClick={() =>
              data.mappings[1].push({
                in_feature: inFeature,
                out_feature: outFeature,
              }) && resetDialog(1, true)
            }
          >
            Submit
          </button>
          <button onClick={() => resetDialog(1, false)}>Cancel</button>
        </footer>
      </article>
    </dialog>
  );

  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>Mappings</h2>
        <hr></hr>
        <section>
          {errors.mappings.status && (
            <p className={`${styles.emptyValue} ${styles.error}`}>
              Mappings cannot be empty
            </p>
          )}
          <div>
            <label className={styles.headingLabel}>Type Mappings:</label>
            {typeMappings.length === 0 && (
              <p className={styles.emptyValue}>
                No Current Type Mappings to Display
              </p>
            )}
            {typeMappings.length > 0 && (
              <MappingsTable
                mode="type"
                handleRemoveMapping={handleRemoveMapping}
                mappingData={typeMappings}
              />
            )}
            <label className={styles.headingLabel}>Feature Mappings:</label>
            {featureMappings.length === 0 && (
              <p className={styles.emptyValue}>
                No Current Feature Mappings to Display
              </p>
            )}
            {featureMappings.length > 0 && (
              <MappingsTable
                mode="feature"
                handleRemoveMapping={handleRemoveMapping}
                mappingData={featureMappings}
              />
            )}
          </div>
          <div className={styles.mappingsContainer}>
            <div>
              <button onClick={() => setAddTypeMappingOpen(true)}>
                Add New Type Mapping
              </button>
              {typeDialog}
            </div>
            <div>
              <button onClick={() => setAddFeatureMappingOpen(true)}>
                Add New Feature Mapping
              </button>
              {featureDialog}
            </div>
          </div>
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default Mappings;