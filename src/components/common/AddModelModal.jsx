import React, { useState, useRef } from "react";
import { Modal, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Bot, CloudUpload, Download, Plus } from "lucide-react";

const AddModelModal = ({ show, onHide, theme = "dark" }) => {
  const [modelData, setModelData] = useState({
    name: "",
    description: "",
    type: "text",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const fileInputRef = useRef(null);

  const totalSteps = 2;

  // Dark and light mode variables
  const isDarkMode = theme === "dark";

  const themeColors = {
    background: isDarkMode ? "var(--color-dark)" : "#ffffff",
    cardBg: isDarkMode ? "rgba(30, 35, 45, 0.7)" : "#f8f9fa",
    input: isDarkMode ? "rgba(20, 25, 35, 0.7)" : "#f1f3f5",
    text: isDarkMode ? "#e0e6ed" : "#212529",
    bodyText: isDarkMode ? "#a0aec0" : "#6c757d",
    border: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#dee2e6",
    shadow: isDarkMode
      ? "0 8px 16px rgba(0, 0, 0, 0.4)"
      : "0 8px 16px rgba(0, 0, 0, 0.1)",
    inputBorder: isDarkMode
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid #ced4da",
    primaryGlow: isDarkMode
      ? "0 0 20px rgba(74, 144, 226, 0.4)"
      : "0 0 20px rgba(13, 110, 253, 0.3)",
    infoBackground: isDarkMode
      ? "rgba(37, 99, 235, 0.1)"
      : "rgba(13, 110, 253, 0.1)",
    infoBorder: isDarkMode
      ? "rgba(37, 99, 235, 0.2)"
      : "rgba(13, 110, 253, 0.2)",
    tooltipBackground: isDarkMode ? "rgba(0, 0, 0, 0.9)" : "#343a40",
    buttonHover: isDarkMode
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(13, 110, 253, 0.15)",
    gradientPrimary: isDarkMode
      ? "linear-gradient(135deg,rgb(25, 67, 127), #00d2ff)"
      : "linear-gradient(135deg, #0d6efd, #0dcaf0)",
    gradientSuccess: "linear-gradient(135deg,rgb(66, 74, 230),rgb(26, 76, 143))",
    dragBgActive: isDarkMode
      ? "rgba(74, 144, 226, 0.15)"
      : "rgba(13, 110, 253, 0.1)",
    uploadAreaBg: isDarkMode
      ? "rgba(255, 255, 255, 0.03)"
      : "rgba(0, 0, 0, 0.02)",
    dangerLightBg: isDarkMode
      ? "rgba(255, 59, 48, 0.1)"
      : "rgba(255, 59, 48, 0.1)",
    dangerLightBorder: isDarkMode
      ? "rgba(255, 59, 48, 0.2)"
      : "rgba(255, 59, 48, 0.2)",
    dangerText: isDarkMode ? "#ff4d4d" : "#dc3545",
    successBg: isDarkMode
      ? "rgba(74, 229, 155, 0.1)"
      : "rgba(25, 135, 84, 0.1)",
    successBorder: isDarkMode
      ? "rgba(74, 229, 155, 0.2)"
      : "rgba(25, 135, 84, 0.2)",
    backdropFilter: isDarkMode ? "blur(10px)" : "blur(5px)",
    modalTitleSize: "1.35rem",
    modalRadius: "16px",
    buttonRadius: "12px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle model creation logic here
    console.log("New model data:", modelData);
    onHide();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    setFileUploaded(false);

    if (!file) {
      setFileName("");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (["json", "csv"].includes(fileExtension)) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          let parsedData;

          if (fileExtension === "json") {
            parsedData = JSON.parse(event.target.result);
            setFileDetails({
              type: "JSON",
              size: (file.size / 1024).toFixed(2) + " KB",
              model: parsedData.model || "Unknown",
              provider: parsedData.provider || "Not specified",
            });
            setFileUploaded(true);
          } else if (fileExtension === "csv") {
            // Simple CSV parsing
            const lines = event.target.result.split("\n");
            if (lines.length >= 2) {
              setFileDetails({
                type: "CSV",
                size: (file.size / 1024).toFixed(2) + " KB",
                rows: lines.length,
                columns: lines[0].split(",").length,
              });
              setFileUploaded(true);
            } else {
              setFileError("Invalid CSV format");
            }
          }
        } catch (error) {
          setFileError(`Error parsing file: ${error.message}`);
        }
      };

      reader.readAsText(file);
    } else {
      setFileError("Please upload a JSON or CSV file");
      setFileName("");
      e.target.value = null;
    }
  };

  // CSS for placeholders and animations
  const customStyles = `
    ::placeholder {
      color: ${
        isDarkMode ? "rgba(160, 174, 192, 0.5)" : "rgba(108, 117, 125, 0.65)"
      } !important;
      opacity: 1;
    }
    
    .modal-blur .modal-content {
      backdrop-filter: ${themeColors.backdropFilter};
      -webkit-backdrop-filter: ${themeColors.backdropFilter};
    }
    
    .modal-backdrop-dark {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .upload-area:hover {
      border-color: var(--color-primary) !important;
      background: ${themeColors.dragBgActive} !important;
    }

    /* Input animations */
    .form-control:focus, .form-select:focus {
      border-color: var(--color-primary) !important;
    }

    /* Button hover animations */
    .btn-primary-action {
      transition: all 0.3s ease;
    }
    
    .btn-primary-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(74, 144, 226, 0.4);
    }

    /* File preview animation */
    .file-preview {
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .badge-theme {
      font-size: 0.75rem;
      padding: 0.35em 0.65em;
      border-radius: 50rem;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;
    }
    
    .badge-primary {
      background: ${
        isDarkMode ? "rgba(74, 144, 226, 0.15)" : "rgba(13, 110, 253, 0.15)"
      };
      color: ${isDarkMode ? "#4a90e2" : "#0d6efd"};
    }
    
    .badge-success {
      background: ${
        isDarkMode ? "rgba(74, 229, 155, 0.15)" : "rgba(25, 135, 84, 0.15)"
      };
      color: ${isDarkMode ? "#4ae59b" : "#198754"};
    }
    
    .step-content {
      animation: fadeSlide 0.4s ease-out;
    }
    
    @keyframes fadeSlide {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      contentClassName="border-0 rounded-circle"
      dialogClassName="modal-blur"
      backdropClassName={isDarkMode ? "modal-backdrop-dark" : ""}
      
    >
      <style>{customStyles}</style>
      <div
        className="modal-content border-0 shadow-lg overflow-hidden"
        style={{
          background: themeColors.background,
          color: themeColors.text,
          boxShadow: themeColors.shadow,
          borderRadius: themeColors.modalRadius,
        }}
      >
        <Modal.Header className="border-0 pb-0 pt-4 px-4">
          <div className="d-flex align-items-center w-100">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "52px",
                height: "52px",
                background: themeColors.gradientPrimary,
                boxShadow: themeColors.primaryGlow,
              }}
            >
              <Bot className="text-white" size={24} />
            </div>
            <div className="flex-grow-1">
              <Modal.Title
                style={{
                  color: themeColors.text,
                  fontSize: themeColors.modalTitleSize,
                }}
                className="fw-bold mb-0"
              >
                Add New AI Model
              </Modal.Title>
              <p
                style={{ color: themeColors.bodyText }}
                className="mb-0 fs-6 mt-1"
              >
                Configure and upload your model settings
              </p>
            </div>
            <button
              type="button"
              className="btn btn-icon bg-transparent border-0"
              onClick={onHide}
              aria-label="Close"
              style={{
                width: "40px",
                height: "40px",
                color: themeColors.bodyText,
                transition: "all 0.3s ease",
                borderRadius: themeColors.buttonRadius,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "#e9ecef")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <i className="fa-solid fa-xmark fs-5"></i>
            </button>
          </div>
        </Modal.Header>

        <div className="px-4 py-3">
          <div
            className="progress rounded-pill overflow-hidden"
            style={{
              height: "8px",
              background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                background: themeColors.gradientPrimary,
                transition: "width 0.5s ease",
              }}
              aria-valuenow={(currentStep / totalSteps) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span
              style={{ color: themeColors.bodyText }}
              className="badge-theme badge-primary"
            >
              <i className="fa-solid fa-bars-progress fs-6"></i>
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ color: themeColors.bodyText }} className="fw-medium">
              {currentStep === 1 ? (
                <span className="badge-theme badge-primary">
                  <i className="fa-solid fa-circle-info"></i>
                  Model Information
                </span>
              ) : (
                <span className="badge-theme badge-primary">
                  <i className="fa-solid fa-file-upload"></i>
                  Upload Configuration
                </span>
              )}
            </span>
          </div>
        </div>

        <Modal.Body className="p-4">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="step-content">
                <div className="mb-4">
                  <label
                    htmlFor="modelName"
                    className="fw-medium mb-2 d-flex align-items-center"
                    style={{ color: themeColors.text }}
                  >
                    <i className="fa-solid fa-tag me-2 text-primary"></i>
                    Model Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-0 py-3 px-4 rounded-3"
                    id="modelName"
                    
                    value={modelData.name}
                    onChange={(e) =>
                      setModelData({ ...modelData, name: e.target.value })
                    }
                    required
                    style={{
                      background: themeColors.input,
                      color: themeColors.text,
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                      border: themeColors.inputBorder,
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = themeColors.primaryGlow)
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="modelDescription"
                    className="fw-medium mb-2 d-flex align-items-center"
                    style={{ color: themeColors.text }}
                  >
                    <i className="fa-solid fa-align-left me-2 text-primary"></i>
                    Description
                  </label>
                  <textarea
                    className="form-control border-0 py-3 px-4 rounded-3"
                    id="modelDescription"
                    rows="3"
                    placeholder="Describe what this model does and what it's best used for"
                    value={modelData.description}
                    onChange={(e) =>
                      setModelData({
                        ...modelData,
                        description: e.target.value,
                      })
                    }
                    style={{
                      background: themeColors.input,
                      color: themeColors.text,
                      resize: "none",
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                      border: themeColors.inputBorder,
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = themeColors.primaryGlow)
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="modelType"
                    className="fw-medium mb-2 d-flex align-items-center"
                    style={{ color: themeColors.text }}
                  >
                    <i className="fa-solid fa-cube me-2 text-primary"></i>
                    Model Type
                  </label>
                  <div className="position-relative">
                    <select
                      className="form-select border-0 py-3 px-4 rounded-3 appearance-none"
                      id="modelType"
                      value={modelData.type}
                      onChange={(e) =>
                        setModelData({ ...modelData, type: e.target.value })
                      }
                      required
                      style={{
                        background: themeColors.input,
                        color: themeColors.text,
                        boxShadow: "none",
                        transition: "all 0.3s ease",
                        border: themeColors.inputBorder,
                      }}
                      onFocus={(e) =>
                        (e.target.style.boxShadow = themeColors.primaryGlow)
                      }
                      onBlur={(e) => (e.target.style.boxShadow = "none")}
                    >
                      <option value="text">Health</option>
                      <option value="image">Art</option>
                      <option value="code">Tchnology</option>
                      <option value="audio">Kitchen</option>
                      <option value="video">Football</option>
                      <option value="embeddings">Sport</option>
                      
                    </select>
                    <div className="position-absolute end-0 top-50 translate-middle-y pe-3 pointer-events-none">
                      <i className="fa-solid fa-chevron-down text-primary"></i>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-3 mt-4"
                  style={{
                    background: themeColors.infoBackground,
                    border: `1px solid ${themeColors.infoBorder}`,
                    borderLeft: "4px solid var(--color-primary)",
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="modelImage" className="block text-sm font-medium text-gray-700">
                      add image:
                    </label>
                    <input
                      type="file"
                      id="modelImage"
                      name="modelImage"
                      accept="image/png"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="d-flex">
                    <i className="fa-solid fa-lightbulb text-primary me-3 mt-1 fs-5"></i>
                    <div>
                      <h6 className="mb-1" style={{ color: themeColors.text }}>
                        Pro Tip
                      </h6>
                      <p
                        style={{ color: themeColors.bodyText }}
                        className="mb-0"
                      >
                        Select the model type that best matches your intended
                        use case. This helps optimize the interface and
                        available settings when working with your model.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <div
                  className="p-0 rounded-4 mb-4"
                  style={{
                    background: themeColors.cardBg,
                    border: themeColors.inputBorder,
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="p-4 border-bottom"
                    style={{ borderColor: themeColors.border }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "44px",
                          height: "44px",
                          background: "var(--color-primary)",
                          boxShadow: "0 4px 10px rgba(74, 144, 226, 0.3)",
                        }}
                      >
                        <Download className="text-white fs-5" size={20} />
                      </div>
                      <div>
                        <h5
                          className="fw-bold mb-0"
                          style={{ color: themeColors.text }}
                        >
                          Upload Model Configuration
                        </h5>
                        <p
                          className="mb-0 mt-1"
                          style={{ color: themeColors.bodyText }}
                        >
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip
                                style={{
                                  background: themeColors.tooltipBackground,
                                }}
                              >
                                Supported file formats
                              </Tooltip>
                            }
                          >
                            <span>
                              <i className="fa-solid fa-circle-info me-1 text-primary"></i>
                              JSON or CSV files with your model settings
                            </span>
                          </OverlayTrigger>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {!fileUploaded ? (
                      <div
                        className="upload-area p-5 rounded-3 text-center position-relative"
                        style={{
                          border: `2px dashed ${themeColors.border}`,
                          background: themeColors.uploadAreaBg,
                          transition: "all 0.3s ease",
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.background =
                            themeColors.dragBgActive;
                          e.currentTarget.style.borderColor =
                            "var(--color-primary)";
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.background =
                            themeColors.uploadAreaBg;
                          e.currentTarget.style.borderColor =
                            themeColors.border;
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.style.background =
                            themeColors.uploadAreaBg;
                          e.currentTarget.style.borderColor =
                            themeColors.border;

                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            const fileInputElement = fileInputRef.current;
                            fileInputElement.files = e.dataTransfer.files;
                            handleFileChange({ target: fileInputElement });
                          }
                        }}
                      >
                        <div className="mb-3">
                          <div
                            className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                            style={{
                              width: "80px",
                              height: "80px",
                              background: isDarkMode
                                ? "rgba(74, 144, 226, 0.1)"
                                : "rgba(13, 110, 253, 0.1)",
                              border: `1px solid ${
                                isDarkMode
                                  ? "rgba(74, 144, 226, 0.2)"
                                  : "rgba(13, 110, 253, 0.2)"
                              }`,
                            }}
                          >
                            <CloudUpload
                              className="text-primary fs-2"
                              size={32}
                            />
                          </div>
                        </div>

                        <h6
                          className="fw-medium mb-2"
                          style={{ color: themeColors.text }}
                        >
                          Drag & Drop your configuration file here
                        </h6>
                        <p
                          style={{ color: themeColors.bodyText }}
                          className="mb-4"
                        >
                          Upload a JSON or CSV file containing your model
                          configuration
                        </p>

                        <button
                          type="button"
                          className="btn py-2 px-4 position-relative overflow-hidden rounded-pill fw-medium btn-primary-action"
                          style={{
                            background: themeColors.gradientPrimary,
                            color: "white",
                            boxShadow: "0 4px 15px rgba(74, 144, 226, 0.3)",
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => fileInputRef.current.click()}
                        >
                          <i className="fa-solid fa-folder-open me-2"></i>
                          Browse Files
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          className="d-none"
                          accept=".json,.csv"
                          onChange={handleFileChange}
                        />
                      </div>
                    ) : (
                      <div className="file-preview">
                        <div
                          className="p-4 rounded-3"
                          style={{
                            background: themeColors.successBg,
                            border: `1px solid ${themeColors.successBorder}`,
                            position: "relative",
                          }}
                        >
                          <div
                            className="position-absolute"
                            style={{ top: "14px", right: "14px" }}
                          >
                            <button
                              type="button"
                              className="btn btn-sm p-1"
                              style={{
                                background: themeColors.dangerLightBg,
                                border: `1px solid ${themeColors.dangerLightBorder}`,
                                color: themeColors.dangerText,
                                borderRadius: "6px",
                                transition: "all 0.2s ease",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={() => {
                                setFileUploaded(false);
                                setFileName("");
                                setFileDetails(null);
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = isDarkMode
                                  ? "rgba(255, 59, 48, 0.2)"
                                  : "rgba(255, 59, 48, 0.2)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background =
                                  themeColors.dangerLightBg;
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>

                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "52px",
                                height: "52px",
                                background: themeColors.gradientSuccess,
                                boxShadow: "0 4px 12px rgba(66, 230, 149, 0.3)",
                              }}
                            >
                              <i className="fa-solid fa-file-circle-check text-white fs-4"></i>
                            </div>

                            <div className="flex-grow-1">
                              <h6
                                className="mb-1 fw-medium"
                                style={{ color: themeColors.text }}
                              >
                                {fileName}
                              </h6>
                              <div className="d-flex align-items-center flex-wrap gap-3">
                                <span className="badge-theme badge-success">
                                  <i className="fa-solid fa-file-code"></i>
                                  {fileDetails?.type}
                                </span>
                                <span className="badge-theme badge-success">
                                  <i className="fa-solid fa-weight-scale"></i>
                                  {fileDetails?.size}
                                </span>
                                {fileDetails?.type === "JSON" && (
                                  <>
                                    <span className="badge-theme badge-success">
                                      <i className="fa-solid fa-cube"></i>
                                      {fileDetails?.model}
                                    </span>
                                    <span className="badge-theme badge-success">
                                      <i className="fa-solid fa-building"></i>
                                      {fileDetails?.provider}
                                    </span>
                                  </>
                                )}
                                {fileDetails?.type === "CSV" && (
                                  <>
                                    <span className="badge-theme badge-success">
                                      <i className="fa-solid fa-table-columns"></i>
                                      {fileDetails?.columns} columns
                                    </span>
                                    <span className="badge-theme badge-success">
                                      <i className="fa-solid fa-table-rows"></i>
                                      {fileDetails?.rows} rows
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {fileError && (
                      <Alert variant="danger" className="mt-3 py-3 rounded-3">
                        <div className="d-flex">
                          <i className="fa-solid fa-circle-exclamation fs-5 me-2 mt-1 text-danger"></i>
                          <div>
                            <h6 className="mb-1 text-danger">Upload Error</h6>
                            <p className="mb-0">{fileError}</p>
                          </div>
                        </div>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 py-4 d-flex">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn fw-medium py-2 px-4 me-2 rounded-pill d-flex align-items-center"
              style={{
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(13, 110, 253, 0.1)",
                color: isDarkMode ? "#e0e6ed" : "#0d6efd",
                transition: "all 0.3s ease",
                border: "none",
              }}
              onClick={prevStep}
              onMouseOver={(e) => {
                e.currentTarget.style.background = themeColors.buttonHover;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(13, 110, 253, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Back
            </button>
          )}

          <div className="ms-auto">
            <button
              type="button"
              className="btn fw-medium py-2 px-4 me-3 rounded-pill"
              style={{
                background: "transparent",
                color: themeColors.bodyText,
                border: themeColors.inputBorder,
                transition: "all 0.3s ease",
              }}
              onClick={onHide}
              onMouseOver={(e) => {
                e.currentTarget.style.background = isDarkMode
                  ? "var(--color-blackest)"
                  : "#f8f9fa";
                e.currentTarget.style.borderColor = isDarkMode
                  ? "var(--color-text-off)"
                  : "#adb5bd";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = isDarkMode
                  ? "var(--color-border)"
                  : "#dee2e6";
              }}
            >
              Cancel
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                className="btn fw-medium py-2 px-4 rounded-pill d-flex align-items-center"
                style={{
                  background: "var(--dark-gradient-2)",
                  color: "var(--color-white)",
                  boxShadow: "0 4px 12px rgba(74, 144, 226, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={nextStep}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(74, 144, 226, 0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(74, 144, 226, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Continue
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn font-p-medium py-2 px-4 d-flex align-items-center"
                style={{
                  background: "var(--dark-gradient-2)",
                  color: "var(--color-white)",
                  borderRadius: "50px", // This ensures the button is rounded
                  boxShadow: "0 4px 12px rgba(74, 144, 226, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={handleSubmit}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(74, 144, 226, 0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(74, 144, 226, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Plus className="me-2" size={30} />
                Traning
              </button>
            )}
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AddModelModal;
