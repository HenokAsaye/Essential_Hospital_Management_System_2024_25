"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPatientHistory = fetchPatientHistory;
exports.updatePatientHistory = updatePatientHistory;
exports.initializeHistory = initializeHistory;
var api_helper_1 = require("../../utility/api-helper");
// Fetch patient history by patient ID
function fetchPatientHistory(patientId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, api_helper_1.getData)("/doctor/patients?patientId=".concat(patientId))];
                case 1:
                    response = _a.sent();
                    console.log('Patient history fetched successfully:', response);
                    return [2 /*return*/, response];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching patient history:', error_1.message);
                    alert("Failed to fetch patient history: ".concat(error_1.message));
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Update patient medical history
function updatePatientHistory(patientId, diagnosis, note, date) {
    return __awaiter(this, void 0, void 0, function () {
        var medicalDto, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medicalDto = { diagnosis: diagnosis, note: note, date: date };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_helper_1.postData)("/doctor/edit-medical-record?patientId=".concat(patientId), medicalDto)];
                case 2:
                    response = _a.sent();
                    console.log('Patient history updated successfully:', response);
                    alert('Medical history updated successfully!');
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error updating patient history:', error_2.message);
                    alert("Failed to update medical history: ".concat(error_2.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Initialize patient history display
function initializeHistory(patientId) {
    var _this = this;
    var historyContainer = document.getElementById('history-container');
    var historyForm = document.getElementById('history-form');
    // Fetch and display patient history
    fetchPatientHistory(patientId).then(function (patient) {
        if (!patient || !historyContainer)
            return;
        // Display patient history in the container
        var historyHtml = patient.medicalHistory
            .map(function (entry) { return "\n      <div class=\"history-entry\">\n        <p><strong>Date:</strong> ".concat(new Date(entry.date).toLocaleDateString(), "</p>\n        <p><strong>Diagnosis:</strong> ").concat(entry.diagnosis, "</p>\n        <p><strong>Note:</strong> ").concat(entry.note, "</p>\n      </div>\n    "); })
            .join('');
        historyContainer.innerHTML = historyHtml;
    });
    // Add event listener to the form for updating history
    if (historyForm) {
        historyForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
            var diagnosisInput, noteInput, dateInput, diagnosis, note, date, formattedDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        diagnosisInput = document.getElementById('diagnosis');
                        noteInput = document.getElementById('note');
                        dateInput = document.getElementById('date');
                        diagnosis = diagnosisInput.value;
                        note = noteInput.value;
                        date = dateInput.value;
                        if (!(diagnosis && note && date)) return [3 /*break*/, 2];
                        formattedDate = new Date(date).toISOString();
                        return [4 /*yield*/, updatePatientHistory(patientId, diagnosis, note, formattedDate)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        alert('Please fill in all fields.');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
}
