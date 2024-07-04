"use client";
import React, { useState } from "react";

const initialData = [
  {
    id: "state-1",
    state: "State 1",
    variants: [
      { id: "variant-1-1", url: "/images/photo1.png", width: 100, size: 100 },
      { id: "variant-1-2", url: "/images/photo2.png", width: 100, size: 100 },
    ],
  },
  {
    id: "state-2",
    state: "State 2",
    variants: [
      { id: "variant-2-1", url: "/images/photo3.png", width: 100, size: 100 },
      { id: "variant-2-2", url: "/images/photo4.jpg", width: 100, size: 100 },
    ],
  },
];

const Table = () => {
  const [data, setData] = useState(initialData);
  const [variantHeaders, setVariantHeaders] = useState([
    "Variant 1",
    "Variant 2",
  ]);
  const [showFilterOptions, setShowFilterOptions] = useState(
    Array(initialData.length).fill(false)
  );

  // Toggle the visibility of filter options
  const handleFilterOptionClick = (option, rowIndex) => {
    const newShowFilterOptions = [...showFilterOptions];
    newShowFilterOptions[rowIndex] = !newShowFilterOptions[rowIndex];
    setShowFilterOptions(newShowFilterOptions);
  };

  // Add a new state
  const addState = () => {
    const newState = {
      id: `state-${data.length + 1}`,
      state: `State ${data.length + 1}`,
      variants: Array(variantHeaders.length).fill({
        id: `variant-${data.length + 1}-${variantHeaders.length + 1}`,
        url: null,
        width: null,
        size: null,
      }),
    };
    setData([...data, newState]);
    setShowFilterOptions([...showFilterOptions, false]);
  };

  // Delete a state
  const deleteState = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setShowFilterOptions(showFilterOptions.slice(0, newData.length));
  };

  // Add a new variant
  const addVariant = () => {
    setVariantHeaders([
      ...variantHeaders,
      `Variant ${variantHeaders.length + 1}`,
    ]);
    const newData = data.map((item) => {
      return {
        ...item,
        variants: [
          ...item.variants,
          {
            id: `variant-${item.id}-${variantHeaders.length + 1}`,
            url: null,
            width: null,
            size: null,
          },
        ],
      };
    });
    setData(newData);
  };

  // Delete a variant
  const deleteVariant = (variantIndex) => {
    setVariantHeaders(
      variantHeaders.filter((_, index) => index !== variantIndex)
    );
    const newData = data.map((item) => {
      const newVariants = item.variants.filter(
        (_, index) => index !== variantIndex
      );
      return { ...item, variants: newVariants };
    });
    setData(newData);
  };

  // Handles file upload for state and variant
  const handleFileChange = (stateIndex, variantIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const newData = [...data];
      newData[stateIndex].variants[variantIndex] = {
        ...newData[stateIndex].variants[variantIndex],
        url: URL.createObjectURL(file),
        width: null,
        size: null,
      };
      setData(newData);
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-2xl rounded-lg border-spacing-1">
      <div className="flex justify-end mb-2">
        <button
          onClick={addVariant}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg"
        >
          + Add Variant
        </button>
      </div>
      <div className="mt-4 overflow-auto relative">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border" style={{ width: "100px" }}>
                Actions
              </th>
              <th className="p-2 border" style={{ width: "45px" }}>
                #
              </th>
              <th className="p-2 border" style={{ width: "170px" }}>
                Add Filters
              </th>
              {variantHeaders.map((header, idx) => (
                <th key={idx} className="p-2 border relative">
                  {header}
                  <button
                    onClick={() => deleteVariant(idx)}
                    className="text-red-500 ml-2 border rounded-full w-6 h-6 flex items-center justify-center absolute top-0 transform translate-x-1/2"
                    style={{ right: "1.5rem", top: "0.5rem" }}
                  >
                    x
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white shadow rounded p-4 my-2">
                <td
                  className="p-2 border text-center"
                  style={{ width: "80px" }}
                >
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => deleteState(item.id)}
                      className="bg-white-700 text-white px-2 py-1 rounded"
                    >
                      <img src="/images/delete.png" alt="delete" width="20" />
                    </button>
                  </div>
                </td>
                <td
                  className="p-2 border text-center"
                  style={{ width: "40px" }}
                >
                  {index + 1}
                </td>
                <td
                  className="p-2 border text-center relative"
                  style={{ width: "120px" }}
                >
                  <button
                    onClick={() => handleFilterOptionClick("Option", index)}
                    className="bg-gray-200 text-black px-3 py-2 rounded text-sm"
                  >
                    + Add Filters
                  </button>
                  {showFilterOptions[index] && (
                    <div className="absolute top-0 left-0 mt-12 bg-white border rounded-lg shadow-lg">
                      <p
                        onClick={() =>
                          handleFilterOptionClick("Option 1", index)
                        }
                        className="cursor-pointer p-2 hover:bg-gray-200"
                      >
                        Option 1
                      </p>
                      <p
                        onClick={() =>
                          handleFilterOptionClick("Option 2", index)
                        }
                        className="cursor-pointer p-2 hover:bg-gray-200"
                      >
                        Option 2
                      </p>
                      <p
                        onClick={() =>
                          handleFilterOptionClick("Option 3", index)
                        }
                        className="cursor-pointer p-2 hover:bg-gray-200"
                      >
                        Option 3
                      </p>
                    </div>
                  )}
                </td>
                {item.variants.map((variant, idx) => (
                  <td key={variant.id} className="p-2 border text-center">
                    {!variant.url ? (
                      <>
                        <button
                          className="bg-gray-200 text-black border px-3 py-10 rounded text-xs font-light"
                          onClick={() =>
                            document
                              .getElementById(`fileInput-${index}-${idx}`)
                              .click()
                          }
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          + Add Design
                        </button>
                        <input
                          type="file"
                          id={`fileInput-${index}-${idx}`}
                          style={{ display: "none" }}
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(event) =>
                            handleFileChange(index, idx, event)
                          }
                        />
                      </>
                    ) : (
                      <div className="flex justify-center items-center">
                        <img
                          src={variant.url}
                          alt={`Design ${idx + 1}`}
                          className="mt-2"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-start mt-4">
        <button
          onClick={addState}
          className="bg-gray-200 text-black px-4 py-2 rounded"
        >
          + Add State
        </button>
      </div>
    </div>
  );
};

export default Table;
