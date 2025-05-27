<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Muscat Bay Water Management System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f5f7;
            color: #333;
            line-height: 1.6;
        }

        .header {
            background: linear-gradient(135deg, #4E4456 0%, #7A6B84 100%);
            color: white;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #8B7A94 0%, #A596AD 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .metric-card {
            text-align: center;
            border-top: 4px solid #4E4456;
        }

        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #4E4456;
            margin: 0.5rem 0;
        }

        .metric-label {
            color: #666;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .metric-change {
            font-size: 0.9rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            display: inline-block;
            margin-top: 0.5rem;
        }

        .positive {
            background: #e6f4ea;
            color: #1e7e34;
        }

        .negative {
            background: #fce4e4;
            color: #cc0000;
        }

        .section-title {
            font-size: 1.8rem;
            color: #4E4456;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid #e0e0e0;
            overflow-x: auto;
        }

        .tab {
            padding: 0.75rem 1.5rem;
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            position: relative;
            transition: color 0.2s;
            font-size: 1rem;
            white-space: nowrap;
        }

        .tab.active {
            color: #4E4456;
            font-weight: 600;
        }

        .tab.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: #4E4456;
        }

        .simple-chart {
            margin: 2rem 0;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .bar-chart {
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            height: 300px;
            margin: 1rem 0;
            border-bottom: 2px solid #333;
            position: relative;
        }

        .bar {
            width: 60px;
            background: #4E4456;
            margin: 0 10px;
            position: relative;
            transition: all 0.3s;
            cursor: pointer;
            border-radius: 4px 4px 0 0;
        }

        .bar:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
        }

        .bar-label {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            white-space: nowrap;
        }

        .bar-value {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-weight: bold;
            font-size: 0.9rem;
        }

        .table-container {
            overflow-x: auto;
            margin-top: 1rem;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #4E4456;
            position: sticky;
            top: 0;
            text-transform: uppercase;
            font-size: 0.85rem;
        }

        tr:hover {
            background: #f8f9fa;
        }

        td {
            vertical-align: middle;
        }

        .zone-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .zone-01 { background: #e3f2fd; color: #1976d2; }
        .zone-03a { background: #f3e5f5; color: #7b1fa2; }
        .zone-03b { background: #e8f5e9; color: #388e3c; }
        .zone-05 { background: #fff3e0; color: #f57c00; }
        .zone-08 { background: #fce4ec; color: #c2185b; }
        .zone-vs { background: #e0f2f1; color: #00796b; }

        .filter-controls {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .filter-select {
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-size: 1rem;
        }

        .hierarchy-diagram {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 8px;
            margin: 1rem 0;
        }

        .hierarchy-level {
            display: flex;
            gap: 1rem;
            margin: 1rem 0;
            flex-wrap: wrap;
            justify-content: center;
        }

        .hierarchy-node {
            background: white;
            border: 2px solid #4E4456;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            min-width: 150px;
            position: relative;
        }

        .hierarchy-node.l1 {
            background: #4E4456;
            color: white;
        }

        .hierarchy-node.l2 {
            background: #7A6B84;
            color: white;
        }

        .hierarchy-node.dc {
            background: #A596AD;
            color: white;
        }

        .alert {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .alert-warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }

        .alert-danger {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 0.5rem;
        }

        .progress-fill {
            height: 100%;
            background: #4E4456;
            transition: width 0.3s ease;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .pie-chart {
            width: 300px;
            height: 300px;
            margin: 2rem auto;
            position: relative;
        }

        .pie-slice {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
        }

        .pie-legend {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 2rem;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        .consumption-bar-container {
            position: relative;
            width: 100%;
            height: 28px;
            background: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
        }

        .consumption-bar {
            height: 100%;
            border-radius: 0 4px 4px 0;
            transition: width 0.3s ease, opacity 0.2s ease;
            position: relative;
            min-width: 50px;
        }

        .consumption-bar:hover {
            opacity: 0.9;
        }

        .consumption-value {
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            font-weight: 600;
            font-size: 0.8rem;
            color: white;
            text-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }

        .consumption-low { background: #2ecc71; }
        .consumption-medium { background: #f1c40f; }
        .consumption-high { background: #e74c3c; }

        input[type="text"] {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 0.9rem;
            width: 200px;
        }

        input[type="text"]:focus {
            outline: none;
            border-color: #4E4456;
        }

        .status-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 4px;
        }

        .pagination-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            padding: 1rem 0;
            border-top: 1px solid #e0e0e0;
        }

        .pagination-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .pagination-btn:hover:not(:disabled) {
            background: #4E4456;
            color: white;
            border-color: #4E4456;
        }

        .pagination-btn:disabled {
            background: #f5f5f5;
            color: #999;
            cursor: not-allowed;
        }

        .page-info {
            padding: 0.5rem 1rem;
            background: #f8f9fa;
            border-radius: 4px;
            font-weight: 500;
        }

        .meter-stats {
            margin-top: 1rem;
            text-align: center;
            color: #666;
            background: #f8f9fa;
            padding: 0.75rem;
            border-radius: 4px;
        }

        .meter-stats strong {
            font-weight: bold;
        }

        .meter-stats .total { color: #4E4456; }
        .meter-stats .active { color: #4caf50; }
        .meter-stats .inactive { color: #f44336; }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8rem;
            }
            
            .dashboard-grid {
                grid-template-columns: 1fr;
            }

            .hierarchy-level {
                flex-direction: column;
                align-items: center;
            }
            
            input[type="text"] {
                width: 100%;
                max-width: 200px;
            }

            .pagination-controls {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>
            <div class="logo">MB</div>
            Muscat Bay Water Management System
        </h1>
        <p>Real-time water distribution monitoring and loss analysis dashboard</p>
    </header>

    <div class="container">
        <div class="filter-controls">
            <select id="periodSelect" class="filter-select" style="background: #4E4456; color: white; border: none;">
                <option value="Apr-25">Apr-25</option>
                <option value="Mar-25">Mar-25</option>
                <option value="Feb-25">Feb-25</option>
                <option value="Jan-25">Jan-25</option>
                <option value="Dec-24">Dec-24</option>
                <option value="Nov-24">Nov-24</option>
            </select>
        </div>

        <div class="tabs">
            <button class="tab active" onclick="showTab('overview')">Overview</button>
            <button class="tab" onclick="showTab('zones')">Zone Analysis</button>
            <button class="tab" onclick="showTab('analysis')">Trend Analysis</button>
            <button class="tab" onclick="showTab('consumers')">Top Consumers</button>
        </div>

        <!-- Overview Tab -->
        <div id="overview" class="tab-content active">
            <h2 class="section-title">
                <span>📊</span> System Overview - <span id="selectedPeriod">Apr-25</span>
            </h2>
            
            <div id="alertSection"></div>
            
            <div class="dashboard-grid">
                <div class="card metric-card">
                    <div class="metric-label">Total Supply (L1)</div>
                    <div class="metric-value" id="totalSupply">0</div>
                    <div class="metric-label">m³</div>
                    <div id="supplyChange" class="metric-change negative">Loading...</div>
                </div>

                <div class="card metric-card">
                    <div class="metric-label">Distribution (L2+DC)</div>
                    <div class="metric-value" id="totalDistribution">0</div>
                    <div class="metric-label">m³</div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="distributionProgress" style="width: 0%"></div>
                    </div>
                </div>

                <div class="card metric-card">
                    <div class="metric-label">Consumption (L3+DC)</div>
                    <div class="metric-value" id="totalConsumption">0</div>
                    <div class="metric-label">m³</div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="consumptionProgress" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <h2 class="section-title">
                <span>💧</span> Water Loss Analysis
            </h2>

            <div class="dashboard-grid">
                <div class="card">
                    <h3>Stage 1 Loss (Trunk Main)</h3>
                    <p style="font-size: 2rem; color: #388e3c; margin: 1rem 0;">
                        <span id="stage1Loss">0</span> m³
                    </p>
                    <p>Percentage: <strong id="stage1Percentage">0%</strong></p>
                    <p style="color: #666; font-size: 0.9rem;">Loss between main source and distribution points</p>
                </div>

                <div class="card">
                    <h3>Stage 2 Loss (Distribution)</h3>
                    <p style="font-size: 2rem; color: #f57c00; margin: 1rem 0;">
                        <span id="stage2Loss">0</span> m³
                    </p>
                    <p>Percentage: <strong id="stage2Percentage">0%</strong></p>
                    <p style="color: #666; font-size: 0.9rem;">Loss within zones between bulk and end users</p>
                </div>

                <div class="card">
                    <h3>Total System Loss</h3>
                    <p style="font-size: 2rem; color: #d32f2f; margin: 1rem 0;">
                        <span id="totalLoss">0</span> m³
                    </p>
                    <p>Percentage: <strong id="totalLossPercentage">0%</strong></p>
                    <p style="color: #666; font-size: 0.9rem;">Overall non-revenue water</p>
                </div>
            </div>

            <div class="card">
                <h3>Water Distribution Hierarchy</h3>
                <div class="hierarchy-diagram">
                    <div class="hierarchy-node l1">
                        <strong>L1 - Main Bulk (NAMA)</strong>
                        <br />
                        <span id="hierarchyL1">0</span> m³
                        <br />
                        <small>100% of supply</small>
                    </div>
                    
                    <div style="font-size: 2rem; margin: 1rem 0; color: #4E4456;">↓</div>
                    
                    <div class="hierarchy-level">
                        <div class="hierarchy-node l2">
                            <strong>L2 - Zone Bulks</strong>
                            <br />
                            <span id="hierarchyL2">0</span> m³
                            <br />
                            <small>6 zones</small>
                        </div>
                        <div class="hierarchy-node dc">
                            <strong>DC - Direct Connections</strong>
                            <br />
                            <span id="hierarchyDC">0</span> m³
                            <br />
                            <small>Hotel, Irrigation, etc.</small>
                        </div>
                    </div>
                    
                    <div style="font-size: 2rem; margin: 1rem 0; color: #4E4456;">↓</div>
                    
                    <div class="hierarchy-node">
                        <strong>L3 + DC - End Users</strong>
                        <br />
                        <span id="hierarchyEndUsers">0</span> m³
                        <br />
                        <small>332 meters total</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Zones Tab -->
        <div id="zones" class="tab-content">
            <h2 class="section-title">
                <span>🏘️</span> Zone Performance Analysis
            </h2>

            <!-- Zone and Month Filters -->
            <div class="filter-controls">
                <select id="zoneSelect" class="filter-select" style="background: #7A6B84; color: white; border: none;">
                    <option value="Zone_01_(FM)">Zone 01 (FM)</option>
                    <option value="Zone_03_(A)">Zone 03A</option>
                    <option value="Zone_03_(B)">Zone 03B</option>
                    <option value="Zone_05">Zone 05</option>
                    <option value="Zone_08">Zone 08</option>
                    <option value="Zone_VS">Village Square</option>
                    <option value="Main_Bulk">Main Bulk (A2)</option>
                </select>
                <select id="zoneMonthSelect" class="filter-select">
                    <option value="Apr-25">Apr-25</option>
                    <option value="Mar-25">Mar-25</option>
                    <option value="Feb-25">Feb-25</option>
                    <option value="Jan-25">Jan-25</option>
                    <option value="Dec-24">Dec-24</option>
                    <option value="Nov-24">Nov-24</option>
                </select>
            </div>

            <!-- Zone KPI Cards -->
            <div class="dashboard-grid" style="margin-top: 2rem;">
                <div class="card metric-card">
                    <div class="metric-label">Zone Bulk Reading</div>
                    <div class="metric-value" id="zoneBulkReading">0</div>
                    <div class="metric-label">m³</div>
                </div>

                <div class="card metric-card">
                    <div class="metric-label">Total Individual Consumption</div>
                    <div class="metric-value" id="zoneIndividualSum">0</div>
                    <div class="metric-label">m³</div>
                </div>

                <div class="card metric-card" style="border-top-color: #cc0000;">
                    <div class="metric-label">Water Loss</div>
                    <div class="metric-value" id="zoneLoss" style="color: #cc0000;">0</div>
                    <div class="metric-label">m³</div>
                </div>

                <div class="card metric-card" style="border-top-color: #cc0000;">
                    <div class="metric-label">Loss Percentage</div>
                    <div class="metric-value" id="zoneLossPercentage" style="color: #cc0000;">0%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="zoneLossBar" style="width: 0%; background: #cc0000;"></div>
                    </div>
                </div>
            </div>

            <!-- Zone Performance Chart -->
            <div class="card" style="margin-top: 2rem;">
                <h3>Zone Performance Visualization - Water Distribution</h3>
                <div class="simple-chart">
                    <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 300px; padding: 20px;">
                        <div style="text-align: center;">
                            <div id="bulkBar" style="width: 80px; background: #4E4456; margin: 0 auto; position: relative; border-radius: 4px 4px 0 0; height: 200px;">
                                <div class="bar-value" style="top: -25px;">0</div>
                            </div>
                            <div style="margin-top: 10px; font-weight: bold;">Bulk Reading</div>
                        </div>
                        <div style="text-align: center;">
                            <div id="individualBar" style="width: 80px; background: #7A6B84; margin: 0 auto; position: relative; border-radius: 4px 4px 0 0; height: 180px;">
                                <div class="bar-value" style="top: -25px;">0</div>
                            </div>
                            <div style="margin-top: 10px; font-weight: bold;">Individual Sum</div>
                        </div>
                        <div style="text-align: center;">
                            <div id="lossBar" style="width: 80px; background: #cc0000; margin: 0 auto; position: relative; border-radius: 4px 4px 0 0; height: 50px;">
                                <div class="bar-value" style="top: -25px; color: #cc0000;">0</div>
                            </div>
                            <div style="margin-top: 10px; font-weight: bold; color: #cc0000;">Loss</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Individual Meters Table -->
            <div class="card" style="margin-top: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3>Individual Meters Detail</h3>
                    <input type="text" id="meterSearch" placeholder="Search meters..." style="padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>METER LABEL</th>
                                <th>ACCOUNT #</th>
                                <th style="text-align: right;">CONSUMPTION (M³)</th>
                                <th style="width: 350px;">CONSUMPTION UNITS</th>
                            </tr>
                        </thead>
                        <tbody id="meterTableBody">
                            <!-- Will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination Controls -->
                <div class="pagination-controls">
                    <div style="color: #666;">
                        Showing <span id="showingStart">1</span>-<span id="showingEnd">12</span> of <span id="totalMetersCount">0</span> meters
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button id="prevPageBtn" class="pagination-btn" onclick="changeMeterPage(-1)">
                            ← Previous
                        </button>
                        <span class="page-info">
                            Page <span id="currentPage">1</span> of <span id="totalPages">1</span>
                        </span>
                        <button id="nextPageBtn" class="pagination-btn" onclick="changeMeterPage(1)">
                            Next →
                        </button>
                    </div>
                </div>
                
                <div class="meter-stats">
                    <small>
                        <strong>Total Meters:</strong> <span id="totalMeters" class="total">0</span> | 
                        <strong>Active:</strong> <span id="activeMeters" class="active">0</span> | 
                        <strong>Inactive:</strong> <span id="inactiveMeters" class="inactive">0</span>
                    </small>
                </div>
            </div>
        </div>

        <!-- Analysis Tab -->
        <div id="analysis" class="tab-content">
            <h2 class="section-title">
                <span>📈</span> Trend Analysis
            </h2>

            <div class="card">
                <h3>Monthly Water Supply Trend</h3>
                <div class="simple-chart">
                    <div class="bar-chart" id="trendChart">
                        <!-- Bars will be inserted by JavaScript -->
                    </div>
                </div>
            </div>

            <div class="dashboard-grid" style="margin-top: 2rem;">
                <div class="card">
                    <h3>System Efficiency</h3>
                    <div class="pie-chart" style="text-align: center;">
                        <div style="font-size: 4rem; color: #4E4456; font-weight: bold;">
                            <span id="efficiencyPercent">0</span>%
                        </div>
                        <p style="color: #666; margin-top: 1rem;">Water Delivered to End Users</p>
                        <div class="progress-bar" style="width: 200px; margin: 2rem auto;">
                            <div class="progress-fill" id="efficiencyBar" style="width: 0%; background: #4E4456;"></div>
                        </div>
                    </div>
                    <div class="pie-legend">
                        <div class="legend-item">
                            <div class="legend-color" style="background: #4E4456;"></div>
                            <span>Delivered: <strong id="deliveredPercent">0%</strong></span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color" style="background: #cc0000;"></div>
                            <span>Lost: <strong id="lostPercent">0%</strong></span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3>Loss Breakdown by Stage</h3>
                    <div class="simple-chart">
                        <div style="margin: 2rem 0;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Stage 1 Loss</span>
                                <strong id="stage1Amount">0 m³</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="stage1Bar" style="width: 0%; background: #7A6B84;"></div>
                            </div>
                        </div>
                        <div style="margin: 2rem 0;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Stage 2 Loss</span>
                                <strong id="stage2Amount">0 m³</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="stage2Bar" style="width: 0%; background: #A596AD;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Consumers Tab -->
        <div id="consumers" class="tab-content">
            <h2 class="section-title">
                <span>🏢</span> Top Consumers - April 2025
            </h2>

            <div class="card">
                <h3>Top 10 Water Consumers</h3>
                <table style="margin-top: 1rem;">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Consumer</th>
                            <th>Type</th>
                            <th>Consumption (m³)</th>
                            <th>% of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Hotel Main Building</td>
                            <td><span class="zone-badge" style="background: #e3f2fd; color: #1976d2;">Retail</span></td>
                            <td style="text-align: right; font-weight: bold;">27,676</td>
                            <td style="text-align: right;">60.3%</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>STP Building</td>
                            <td><span class="zone-badge" style="background: #f3e5f5; color: #7b1fa2;">Utility</span></td>
                            <td style="text-align: right; font-weight: bold;">1,200</td>
                            <td style="text-align: right;">2.6%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Irrigation Controller UP</td>
                            <td><span class="zone-badge" style="background: #f3e5f5; color: #7b1fa2;">IRR_Services</span></td>
                            <td style="text-align: right; font-weight: bold;">1,000</td>
                            <td style="text-align: right;">2.2%</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Al Adrak Camp</td>
                            <td><span class="zone-badge" style="background: #e3f2fd; color: #1976d2;">Retail</span></td>
                            <td style="text-align: right; font-weight: bold;">1,000</td>
                            <td style="text-align: right;">2.2%</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Al Adrak Construction</td>
                            <td><span class="zone-badge" style="background: #e3f2fd; color: #1976d2;">Retail</span></td>
                            <td style="text-align: right; font-weight: bold;">600</td>
                            <td style="text-align: right;">1.3%</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Irrigation Controller DOWN</td>
                            <td><span class="zone-badge" style="background: #f3e5f5; color: #7b1fa2;">IRR_Services</span></td>
                            <td style="text-align: right; font-weight: bold;">411</td>
                            <td style="text-align: right;">0.9%</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Z8-5 (Villa)</td>
                            <td><span class="zone-badge" style="background: #e8f5e9; color: #388e3c;">Residential</span></td>
                            <td style="text-align: right; font-weight: bold;">336</td>
                            <td style="text-align: right;">0.7%</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Building CIF/CB</td>
                            <td><span class="zone-badge" style="background: #e3f2fd; color: #1976d2;">Retail</span></td>
                            <td style="text-align: right; font-weight: bold;">307</td>
                            <td style="text-align: right;">0.7%</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Z3-31 (Villa)</td>
                            <td><span class="zone-badge" style="background: #e8f5e9; color: #388e3c;">Residential</span></td>
                            <td style="text-align: right; font-weight: bold;">306</td>
                            <td style="text-align: right;">0.7%</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Building B8</td>
                            <td><span class="zone-badge" style="background: #e3f2fd; color: #1976d2;">Retail</span></td>
                            <td style="text-align: right; font-weight: bold;">261</td>
                            <td style="text-align: right;">0.6%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="alert alert-warning" style="margin-top: 2rem;">
                <strong>Key Insight:</strong> The Hotel Main Building alone consumes 60.3% of total end-user consumption (27,676 m³ out of 45,863 m³). 
                This single consumer represents a critical monitoring point for the system.
            </div>

            <div class="card" style="margin-top: 2rem;">
                <h3>Consumption by Type</h3>
                <div class="simple-chart">
                    <div class="bar-chart" id="typeChart" style="height: 250px;">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
       // Accurate water data from CSV analysis - Complete 2024-2025 Dataset
const waterData = {
    'Jan-24': { L1: 32803, L2: 11964, DC: 16725, L3: 8955 },
    'Feb-24': { L1: 27996, L2: 10292, DC: 14781, L3: 7120 },
    'Mar-24': { L1: 23860, L2: 11087, DC: 12920, L3: 6706 },
    'Apr-24': { L1: 31869, L2: 13380, DC: 15333, L3: 8251 },
    'May-24': { L1: 30737, L2: 11785, DC: 16304, L3: 7388 },
    'Jun-24': { L1: 41953, L2: 15699, DC: 18927, L3: 8938 },
    'Jul-24': { L1: 35166, L2: 18370, DC: 16319, L3: 9642 },
    'Aug-24': { L1: 35420, L2: 15292, DC: 16306, L3: 8634 },
    'Sep-24': { L1: 41341, L2: 14173, DC: 17640, L3: 8064 },
    'Oct-24': { L1: 31519, L2: 13588, DC: 20937, L3: 9570 },
    'Nov-24': { L1: 35290, L2: 11203, DC: 17501, L3: 8891 },
    'Dec-24': { L1: 36733, L2: 15095, DC: 16014, L3: 9545 },
    'Jan-25': { L1: 32580, L2: 15327, DC: 19998, L3: 7900 },
    'Feb-25': { L1: 44043, L2: 14716, DC: 21095, L3: 7274 },
    'Mar-25': { L1: 34915, L2: 15290, DC: 24275, L3: 7989 },
    'Apr-25': { L1: 46039, L2: 15031, DC: 30832, L3: 8140 }
};

// Accurate zone data from actual CSV files - Complete Dataset
const detailedZoneData = {
    'Zone_01_(FM)': {
        name: 'Zone 01 (FM)',
        'Jan-24': { bulk: 1595, individual: 1624, loss: -29 },
        'Feb-24': { bulk: 1283, individual: 1010, loss: 273 },
        'Mar-24': { bulk: 1255, individual: 985, loss: 270 },
        'Apr-24': { bulk: 1383, individual: 1070, loss: 313 },
        'May-24': { bulk: 1411, individual: 1168, loss: 243 },
        'Jun-24': { bulk: 2078, individual: 1414, loss: 664 },
        'Jul-24': { bulk: 2601, individual: 2128, loss: 473 },
        'Aug-24': { bulk: 1638, individual: 1418, loss: 220 },
        'Sep-24': { bulk: 1550, individual: 1274, loss: 276 },
        'Oct-24': { bulk: 2098, individual: 1570, loss: 528 },
        'Nov-24': { bulk: 1808, individual: 1648, loss: 160 },
        'Dec-24': { bulk: 1946, individual: 1880, loss: 66 },
        'Jan-25': { bulk: 2008, individual: 1898, loss: 110 },
        'Feb-25': { bulk: 1740, individual: 1648, loss: 92 },
        'Mar-25': { bulk: 1880, individual: 1817, loss: 63 },
        'Apr-25': { bulk: 1880, individual: 1629, loss: 251 },
        meters: [
            { label: 'Building FM', account: '4300296', type: 'MB_Common', 'Apr-25': 40, 'Mar-25': 49, 'Feb-25': 39, 'Jan-25': 37, status: 'active' },
            { label: 'Building Taxi', account: '4300298', type: 'Retail', 'Apr-25': 14, 'Mar-25': 12, 'Feb-25': 16, 'Jan-25': 11, status: 'active' },
            { label: 'Building B1', account: '4300300', type: 'Retail', 'Apr-25': 253, 'Mar-25': 235, 'Feb-25': 225, 'Jan-25': 228, status: 'active' },
            { label: 'Building B2', account: '4300301', type: 'Retail', 'Apr-25': 187, 'Mar-25': 202, 'Feb-25': 213, 'Jan-25': 236, status: 'active' },
            { label: 'Building B3', account: '4300302', type: 'Retail', 'Apr-25': 134, 'Mar-25': 132, 'Feb-25': 165, 'Jan-25': 169, status: 'active' },
            { label: 'Building B4', account: '4300303', type: 'Retail', 'Apr-25': 148, 'Mar-25': 148, 'Feb-25': 108, 'Jan-25': 108, status: 'active' },
            { label: 'Building B5', account: '4300304', type: 'Retail', 'Apr-25': 1, 'Mar-25': 1, 'Feb-25': 2, 'Jan-25': 1, status: 'active' },
            { label: 'Building B6', account: '4300305', type: 'Retail', 'Apr-25': 281, 'Mar-25': 268, 'Feb-25': 228, 'Jan-25': 254, status: 'active' },
            { label: 'Building B7', account: '4300306', type: 'Retail', 'Apr-25': 201, 'Mar-25': 174, 'Feb-25': 190, 'Jan-25': 178, status: 'active' },
            { label: 'Building B8', account: '4300307', type: 'Retail', 'Apr-25': 0, 'Mar-25': 233, 'Feb-25': 250, 'Jan-25': 268, status: 'inactive' },
            { label: 'Irrigation Tank (Z01_FM)', account: '4300308', type: 'IRR_Services', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Room PUMP (FIRE)', account: '4300309', type: 'MB_Common', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 78, status: 'inactive' },
            { label: 'Building (MEP)', account: '4300310', type: 'MB_Common', 'Apr-25': 5, 'Mar-25': 1, 'Feb-25': 2, 'Jan-25': 2, status: 'active' },
            { label: 'Building CIF/CB', account: '4300324', type: 'Retail', 'Apr-25': 307, 'Mar-25': 306, 'Feb-25': 331, 'Jan-25': 420, status: 'active' },
            { label: 'Building Nursery Building', account: '4300325', type: 'Retail', 'Apr-25': 0, 'Mar-25': 4, 'Feb-25': 4, 'Jan-25': 4, status: 'inactive' },
            { label: 'Cabinet FM (CONTRACTORS OFFICE)', account: '4300337', type: 'MB_Common', 'Apr-25': 58, 'Mar-25': 52, 'Feb-25': 59, 'Jan-25': 68, status: 'active' },
            { label: 'Building CIF/CB (COFFEE SH)', account: '4300339', type: 'Retail', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' }
        ]
    },
    'Zone_03_(A)': {
        name: 'Zone 03A',
        'Jan-24': { bulk: 1234, individual: 1041, loss: 193 },
        'Feb-24': { bulk: 1099, individual: 938, loss: 161 },
        'Mar-24': { bulk: 1297, individual: 813, loss: 484 },
        'Apr-24': { bulk: 1892, individual: 1070, loss: 822 },
        'May-24': { bulk: 2254, individual: 1203, loss: 1051 },
        'Jun-24': { bulk: 2227, individual: 1338, loss: 889 },
        'Jul-24': { bulk: 3313, individual: 1671, loss: 1642 },
        'Aug-24': { bulk: 3172, individual: 1923, loss: 1249 },
        'Sep-24': { bulk: 2698, individual: 1580, loss: 1118 },
        'Oct-24': { bulk: 3715, individual: 2271, loss: 1444 },
        'Nov-24': { bulk: 3501, individual: 2140, loss: 1361 },
        'Dec-24': { bulk: 3796, individual: 2333, loss: 1463 },
        'Jan-25': { bulk: 4235, individual: 2486, loss: 1749 },
        'Feb-25': { bulk: 4273, individual: 2548, loss: 1725 },
        'Mar-25': { bulk: 3591, individual: 1929, loss: 1662 },
        'Apr-25': { bulk: 4041, individual: 2168, loss: 1873 },
        meters: [
            { label: 'Z3-42 (Villa)', account: '4300002', type: 'Residential (Villa)', 'Apr-25': 62, 'Mar-25': 19, 'Feb-25': 46, 'Jan-25': 32, status: 'active' },
            { label: 'Z3-46(5) (Building)', account: '4300003', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 5, status: 'inactive' },
            { label: 'Z3-49(3) (Building)', account: '4300004', type: 'Residential (Apart)', 'Apr-25': 13, 'Mar-25': 11, 'Feb-25': 15, 'Jan-25': 10, status: 'active' },
            { label: 'Z3-38 (Villa)', account: '4300005', type: 'Residential (Villa)', 'Apr-25': 7, 'Mar-25': 7, 'Feb-25': 7, 'Jan-25': 10, status: 'active' },
            { label: 'Z3-75(4) (Building)', account: '4300006', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-46(3A) (Building)', account: '4300007', type: 'Residential (Apart)', 'Apr-25': 35, 'Mar-25': 15, 'Feb-25': 35, 'Jan-25': 38, status: 'active' },
            { label: 'Z3-049(4) (Building)', account: '4300010', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 8, 'Feb-25': 1, 'Jan-25': 8, status: 'inactive' },
            { label: 'Z3-46(1A) (Building)', account: '4300011', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 10, 'Feb-25': 10, 'Jan-25': 11, status: 'active' },
            { label: 'Z3-47(2) (Building)', account: '4300012', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-45(3A) (Building)', account: '4300013', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 4, 'Jan-25': 8, status: 'active' },
            { label: 'Z3-46(2A) (Building)', account: '4300014', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-46(6) (Building)', account: '4300015', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-47(4) (Building)', account: '4300016', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 12, 'Jan-25': 11, status: 'active' },
            { label: 'Z3-45(5) (Building)', account: '4300017', type: 'Residential (Apart)', 'Apr-25': 2, 'Mar-25': 2, 'Feb-25': 3, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-47(5) (Building)', account: '4300018', type: 'Residential (Apart)', 'Apr-25': 18, 'Mar-25': 11, 'Feb-25': 12, 'Jan-25': 36, status: 'active' },
            { label: 'Z3-45(6) (Building)', account: '4300019', type: 'Residential (Apart)', 'Apr-25': 42, 'Mar-25': 32, 'Feb-25': 18, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-50(4) (Building)', account: '4300021', type: 'Residential (Apart)', 'Apr-25': 17, 'Mar-25': 6, 'Feb-25': 4, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-74(3) (Building)', account: '4300022', type: 'Residential (Apart)', 'Apr-25': 27, 'Mar-25': 19, 'Feb-25': 19, 'Jan-25': 12, status: 'active' },
            { label: 'Z3-45(4A) (Building)', account: '4300026', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-50(5) (Building)', account: '4300027', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 22, 'Feb-25': 10, 'Jan-25': 9, status: 'active' },
            { label: 'Z3-50(6) (Building)', account: '4300028', type: 'Residential (Apart)', 'Apr-25': 13, 'Mar-25': 18, 'Feb-25': 20, 'Jan-25': 21, status: 'active' },
            { label: 'Z3-44(1A) (Building)', account: '4300030', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 10, 'Feb-25': 11, 'Jan-25': 11, status: 'active' },
            { label: 'Z3-44(1B) (Building)', account: '4300031', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-44(2A) (Building)', account: '4300032', type: 'Residential (Apart)', 'Apr-25': 10, 'Mar-25': 5, 'Feb-25': 3, 'Jan-25': 9, status: 'active' },
            { label: 'Z3-44(2B) (Building)', account: '4300033', type: 'Residential (Apart)', 'Apr-25': 8, 'Mar-25': 7, 'Feb-25': 7, 'Jan-25': 7, status: 'active' },
            { label: 'Z3-44(5) (Building)', account: '4300034', type: 'Residential (Apart)', 'Apr-25': 25, 'Mar-25': 38, 'Feb-25': 139, 'Jan-25': 118, status: 'active' },
            { label: 'Z3-44(6) (Building)', account: '4300035', type: 'Residential (Apart)', 'Apr-25': 37, 'Mar-25': 31, 'Feb-25': 37, 'Jan-25': 34, status: 'active' },
            { label: 'Z3-75(1) (Building)', account: '4300036', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-75(3) (Building)', account: '4300037', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 0, 'Feb-25': 7, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-23 (Villa)', account: '4300038', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-47(3) (Building)', account: '4300039', type: 'Residential (Apart)', 'Apr-25': 17, 'Mar-25': 17, 'Feb-25': 19, 'Jan-25': 18, status: 'active' },
            { label: 'Z3-48(3) (Building)', account: '4300040', type: 'Residential (Apart)', 'Apr-25': 4, 'Mar-25': 4, 'Feb-25': 5, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-48(6) (Building)', account: '4300041', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-46(4A) (Building)', account: '4300043', type: 'Residential (Apart)', 'Apr-25': 19, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 4, status: 'active' },
            { label: 'Z3-41 (Villa)', account: '4300044', type: 'Residential (Villa)', 'Apr-25': 26, 'Mar-25': 34, 'Feb-25': 18, 'Jan-25': 13, status: 'active' },
            { label: 'Z3-74(5) (Building)', account: '4300045', type: 'Residential (Apart)', 'Apr-25': 16, 'Mar-25': 12, 'Feb-25': 7, 'Jan-25': 13, status: 'active' },
            { label: 'Z3-74(6) (Building)', account: '4300046', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 4, 'Feb-25': 4, 'Jan-25': 12, status: 'active' },
            { label: 'Z3-50(3) (Building)', account: '4300047', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 6, 'Feb-25': 13, 'Jan-25': 8, status: 'active' },
            { label: 'Z3-48(5) (Building)', account: '4300048', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 2, status: 'inactive' },
            { label: 'Z3-37 (Villa)', account: '4300049', type: 'Residential (Villa)', 'Apr-25': 28, 'Mar-25': 18, 'Feb-25': 15, 'Jan-25': 26, status: 'active' },
            { label: 'Z3-43 (Villa)', account: '4300050', type: 'Residential (Villa)', 'Apr-25': 52, 'Mar-25': 46, 'Feb-25': 68, 'Jan-25': 70, status: 'active' },
            { label: 'Z3-47(6) (Building)', account: '4300051', type: 'Residential (Apart)', 'Apr-25': 17, 'Mar-25': 16, 'Feb-25': 14, 'Jan-25': 29, status: 'active' },
            { label: 'Z3-31 (Villa)', account: '4300052', type: 'Residential (Villa)', 'Apr-25': 306, 'Mar-25': 30, 'Feb-25': 133, 'Jan-25': 165, status: 'active' },
            { label: 'Z3-49(5) (Building)', account: '4300053', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 5, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-75(5) (Building)', account: '4300055', type: 'Residential (Apart)', 'Apr-25': 16, 'Mar-25': 12, 'Feb-25': 12, 'Jan-25': 16, status: 'active' },
            { label: 'Z3-49(6) (Building)', account: '4300061', type: 'Residential (Apart)', 'Apr-25': 27, 'Mar-25': 21, 'Feb-25': 22, 'Jan-25': 25, status: 'active' },
            { label: 'Z3-75(6) (Building)', account: '4300063', type: 'Residential (Apart)', 'Apr-25': 36, 'Mar-25': 35, 'Feb-25': 32, 'Jan-25': 35, status: 'active' },
            { label: 'Z3-35 (Villa)', account: '4300075', type: 'Residential (Villa)', 'Apr-25': 74, 'Mar-25': 52, 'Feb-25': 61, 'Jan-25': 65, status: 'active' },
            { label: 'Z3-40 (Villa)', account: '4300079', type: 'Residential (Villa)', 'Apr-25': 37, 'Mar-25': 37, 'Feb-25': 23, 'Jan-25': 18, status: 'active' },
            { label: 'Z3-30 (Villa)', account: '4300081', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 4, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-33 (Villa)', account: '4300082', type: 'Residential (Villa)', 'Apr-25': 50, 'Mar-25': 40, 'Feb-25': 45, 'Jan-25': 45, status: 'active' },
            { label: 'Z3-36 (Villa)', account: '4300084', type: 'Residential (Villa)', 'Apr-25': 83, 'Mar-25': 69, 'Feb-25': 83, 'Jan-25': 81, status: 'active' },
            { label: 'Z3-32 (Villa)', account: '4300085', type: 'Residential (Villa)', 'Apr-25': 38, 'Mar-25': 33, 'Feb-25': 39, 'Jan-25': 38, status: 'active' },
            { label: 'Z3-39 (Villa)', account: '4300086', type: 'Residential (Villa)', 'Apr-25': 33, 'Mar-25': 29, 'Feb-25': 36, 'Jan-25': 39, status: 'active' },
            { label: 'Z3-34 (Villa)', account: '4300087', type: 'Residential (Villa)', 'Apr-25': 20, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-27 (Villa)', account: '4300089', type: 'Residential (Villa)', 'Apr-25': 73, 'Mar-25': 55, 'Feb-25': 32, 'Jan-25': 15, status: 'active' },
            { label: 'Z3-24 (Villa)', account: '4300091', type: 'Residential (Villa)', 'Apr-25': 101, 'Mar-25': 78, 'Feb-25': 39, 'Jan-25': 18, status: 'active' },
            { label: 'Z3-25 (Villa)', account: '4300093', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 3, status: 'inactive' },
            { label: 'Z3-26 (Villa)', account: '4300095', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-29 (Villa)', account: '4300097', type: 'Residential (Villa)', 'Apr-25': 2, 'Mar-25': 3, 'Feb-25': 7, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-28 (Villa)', account: '4300101', type: 'Residential (Villa)', 'Apr-25': 41, 'Mar-25': 30, 'Feb-25': 38, 'Jan-25': 44, status: 'active' },
            { label: 'Z3-74(1) (Building)', account: '4300106', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-49(1) (Building)', account: '4300107', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 3, 'Feb-25': 4, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-49(2) (Building)', account: '4300108', type: 'Residential (Apart)', 'Apr-25': 15, 'Mar-25': 12, 'Feb-25': 15, 'Jan-25': 15, status: 'active' },
            { label: 'Z3-50(1) (Building)', account: '4300109', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 28, 'Feb-25': 26, 'Jan-25': 22, status: 'active' },
            { label: 'Z3-45(1A) (Building)', account: '4300110', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-51(1) (Building)', account: '4300111', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-51(2) (Building)', account: '4300112', type: 'Residential (Apart)', 'Apr-25': 30, 'Mar-25': 31, 'Feb-25': 28, 'Jan-25': 32, status: 'active' },
            { label: 'Z3-45(2A) (Building)', account: '4300113', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 9, 'Feb-25': 7, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-050(2) (Building)', account: '4300114', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 0, 'Feb-25': 8, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-47(1) (Building)', account: '4300115', type: 'Residential (Apart)', 'Apr-25': 15, 'Mar-25': 10, 'Feb-25': 11, 'Jan-25': 9, status: 'active' },
            { label: 'Z3-48(1) (Building)', account: '4300117', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 4, 'Feb-25': 5, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-74(2) (Building)', account: '4300118', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-51(3) (Building)', account: '4300121', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 9, 'Feb-25': 10, 'Jan-25': 13, status: 'active' },
            { label: 'Z3-75(2) (Building)', account: '4300122', type: 'Residential (Apart)', 'Apr-25': 8, 'Mar-25': 9, 'Feb-25': 7, 'Jan-25': 7, status: 'active' },
            { label: 'Z3-48(2) (Building)', account: '4300123', type: 'Residential (Apart)', 'Apr-25': 2, 'Mar-25': 4, 'Feb-25': 0, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-74(4) (Building)', account: '4300125', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 2, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-51(4) (Building)', account: '4300127', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 12, 'Feb-25': 9, 'Jan-25': 11, status: 'active' },
            { label: 'Z3-051(5) (Building)', account: '4300128', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 19, 'Feb-25': 5, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-48(4) (Building)', account: '4300131', type: 'Residential (Apart)', 'Apr-25': 4, 'Mar-25': 5, 'Feb-25': 5, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-51(6) (Building)', account: '4300134', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 5, 'Feb-25': 2, 'Jan-25': 8, status: 'active' },
            { label: 'D 45-Building Common Meter', account: '4300135', type: 'D_Building_Common', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'D 50-Building Common Meter', account: '4300136', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'D 51-Building Common Meter', account: '4300137', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'D 46-Building Common Meter', account: '4300138', type: 'D_Building_Common', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'D 74-Building Common Meter', account: '4300139', type: 'D_Building_Common', 'Apr-25': 2, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'D 49-Building Common Meter', account: '4300140', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 2, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'D 48-Building Common Meter', account: '4300141', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'D 47-Building Common Meter', account: '4300143', type: 'D_Building_Common', 'Apr-25': 2, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'D 44-Building Common Meter', account: '4300144', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'D 75-Building Common Meter', account: '4300145', type: 'D_Building_Common', 'Apr-25': 7, 'Mar-25': 3, 'Feb-25': 4, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-74(3) (Building)', account: '4300322', type: 'Residential (Apart)', 'Apr-25': 20, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' }
        ]
    },
    'Zone_03_(B)': {
        name: 'Zone 03B',
        'Jan-24': { bulk: 2653, individual: 1570, loss: 1083 },
        'Feb-24': { bulk: 2169, individual: 1492, loss: 677 },
        'Mar-24': { bulk: 2315, individual: 1565, loss: 750 },
        'Apr-24': { bulk: 2381, individual: 1681, loss: 700 },
        'May-24': { bulk: 2634, individual: 1697, loss: 937 },
        'Jun-24': { bulk: 2932, individual: 1923, loss: 1009 },
        'Jul-24': { bulk: 3369, individual: 2104, loss: 1265 },
        'Aug-24': { bulk: 3458, individual: 2147, loss: 1311 },
        'Sep-24': { bulk: 3742, individual: 1932, loss: 1810 },
        'Oct-24': { bulk: 2906, individual: 2137, loss: 769 },
        'Nov-24': { bulk: 2695, individual: 1844, loss: 851 },
        'Dec-24': { bulk: 3583, individual: 2005, loss: 1578 },
        'Jan-25': { bulk: 3256, individual: 2063, loss: 1193 },
        'Feb-25': { bulk: 2962, individual: 1854, loss: 1108 },
        'Mar-25': { bulk: 3331, individual: 1470, loss: 1861 },
        'Apr-25': { bulk: 2157, individual: 2168, loss: -11 },
        meters: [
            { label: 'Z3-52(6) (Building)', account: '4300008', type: 'Residential (Apart)', 'Apr-25': 14, 'Mar-25': 9, 'Feb-25': 9, 'Jan-25': 10, status: 'active' },
            { label: 'Z3-21 (Villa)', account: '4300009', type: 'Residential (Villa)', 'Apr-25': 48, 'Mar-25': 42, 'Feb-25': 53, 'Jan-25': 41, status: 'active' },
            { label: 'Z3-20 (Villa)', account: '4300020', type: 'Residential (Villa)', 'Apr-25': 3, 'Mar-25': 7, 'Feb-25': 14, 'Jan-25': 12, status: 'active' },
            { label: 'Z3-13 (Villa)', account: '4300025', type: 'Residential (Villa)', 'Apr-25': 24, 'Mar-25': 18, 'Feb-25': 22, 'Jan-25': 20, status: 'active' },
            { label: 'Z3-52(4A) (Building)', account: '4300029', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-52(3A) (Building)', account: '4300042', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 5, 'Feb-25': 9, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-62(6) (Building)', account: '4300054', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 17, 'Feb-25': 19, 'Jan-25': 39, status: 'active' },
            { label: 'Z3-52(5) (Building)', account: '4300056', type: 'Residential (Apart)', 'Apr-25': 7, 'Mar-25': 4, 'Feb-25': 3, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-15 (Villa)', account: '4300057', type: 'Residential (Villa)', 'Apr-25': 47, 'Mar-25': 35, 'Feb-25': 41, 'Jan-25': 40, status: 'active' },
            { label: 'Z3-14 (Villa)', account: '4300060', type: 'Residential (Villa)', 'Apr-25': 43, 'Mar-25': 30, 'Feb-25': 102, 'Jan-25': 166, status: 'active' },
            { label: 'Z3-62(1) (Building)', account: '4300062', type: 'Residential (Apart)', 'Apr-25': 10, 'Mar-25': 15, 'Feb-25': 1, 'Jan-25': 4, status: 'active' },
            { label: 'Z3-53(4B) (Building)', account: '4300064', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-60(1B) (Building)', account: '4300065', type: 'Residential (Apart)', 'Apr-25': 14, 'Mar-25': 9, 'Feb-25': 14, 'Jan-25': 14, status: 'active' },
            { label: 'Z3-59(4B) (Building)', account: '4300066', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 3, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-60(3B) (Building)', account: '4300067', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 2, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-60(4B) (Building)', account: '4300068', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 5, 'Feb-25': 3, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-52(2A) (Building)', account: '4300069', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-58(1B) (Building)', account: '4300070', type: 'Residential (Apart)', 'Apr-25': 2, 'Mar-25': 1, 'Feb-25': 2, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-55(1B) (Building)', account: '4300071', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 3, 'Feb-25': 4, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-60(2B) (Building)', account: '4300072', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-59(3A) (Building)', account: '4300073', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-53(6) (Building)', account: '4300074', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-12 (Villa)', account: '4300076', type: 'Residential (Villa)', 'Apr-25': 181, 'Mar-25': 54, 'Feb-25': 59, 'Jan-25': 73, status: 'active' },
            { label: 'Z3-11 (Villa)', account: '4300077', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-4 (Villa)', account: '4300078', type: 'Residential (Villa)', 'Apr-25': 23, 'Mar-25': 22, 'Feb-25': 55, 'Jan-25': 90, status: 'active' },
            { label: 'Z3-17 (Villa)', account: '4300080', type: 'Residential (Villa)', 'Apr-25': 13, 'Mar-25': 5, 'Feb-25': 8, 'Jan-25': 19, status: 'active' },
            { label: 'Z3-18 (Villa)', account: '4300083', type: 'Residential (Villa)', 'Apr-25': 39, 'Mar-25': 33, 'Feb-25': 36, 'Jan-25': 36, status: 'active' },
            { label: 'Z3-3 (Villa)', account: '4300088', type: 'Residential (Villa)', 'Apr-25': 73, 'Mar-25': 63, 'Feb-25': 59, 'Jan-25': 66, status: 'active' },
            { label: 'Z3-7 (Villa)', account: '4300090', type: 'Residential (Villa)', 'Apr-25': 57, 'Mar-25': 46, 'Feb-25': 45, 'Jan-25': 38, status: 'active' },
            { label: 'Z3-10 (Villa)', account: '4300092', type: 'Residential (Villa)', 'Apr-25': 101, 'Mar-25': 62, 'Feb-25': 81, 'Jan-25': 78, status: 'active' },
            { label: 'Z3-1 (Villa)', account: '4300094', type: 'Residential (Villa)', 'Apr-25': 7, 'Mar-25': 5, 'Feb-25': 4, 'Jan-25': 4, status: 'active' },
            { label: 'Z3-9 (Villa)', account: '4300096', type: 'Residential (Villa)', 'Apr-25': 60, 'Mar-25': 55, 'Feb-25': 49, 'Jan-25': 67, status: 'active' },
            { label: 'Z3-2 (Villa)', account: '4300098', type: 'Residential (Villa)', 'Apr-25': 7, 'Mar-25': 8, 'Feb-25': 6, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-19 (Villa)', account: '4300099', type: 'Residential (Villa)', 'Apr-25': 108, 'Mar-25': 26, 'Feb-25': 6, 'Jan-25': 138, status: 'active' },
            { label: 'Z3-6 (Villa)', account: '4300100', type: 'Residential (Villa)', 'Apr-25': 36, 'Mar-25': 38, 'Feb-25': 33, 'Jan-25': 31, status: 'active' },
            { label: 'Z3-22 (Villa)', account: '4300102', type: 'Residential (Villa)', 'Apr-25': 31, 'Mar-25': 53, 'Feb-25': 14, 'Jan-25': 32, status: 'active' },
            { label: 'Z3-16 (Villa)', account: '4300103', type: 'Residential (Villa)', 'Apr-25': 5, 'Mar-25': 2, 'Feb-25': 28, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-5 (Villa)', account: '4300104', type: 'Residential (Villa)', 'Apr-25': 55, 'Mar-25': 42, 'Feb-25': 51, 'Jan-25': 40, status: 'active' },
            { label: 'Z3-8 (Villa)', account: '4300105', type: 'Residential (Villa)', 'Apr-25': 358, 'Mar-25': 196, 'Feb-25': 106, 'Jan-25': 83, status: 'active' },
            { label: 'Z3-52(1A) (Building)', account: '4300116', type: 'Residential (Apart)', 'Apr-25': 8, 'Mar-25': 5, 'Feb-25': 14, 'Jan-25': 19, status: 'active' },
            { label: 'Z3-62(2) (Building)', account: '4300119', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 8, 'Feb-25': 10, 'Jan-25': 7, status: 'active' },
            { label: 'Z3-58(5) (Building)', account: '4300120', type: 'Residential (Apart)', 'Apr-25': 30, 'Mar-25': 32, 'Feb-25': 23, 'Jan-25': 29, status: 'active' },
            { label: 'Z3-62(3) (Building)', account: '4300124', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'D 52-Building Common Meter', account: '4300126', type: 'D_Building_Common', 'Apr-25': 4, 'Mar-25': 2, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-62(4) (Building)', account: '4300129', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-58(3B) (Building)', account: '4300130', type: 'Residential (Apart)', 'Apr-25': 29, 'Mar-25': 3, 'Feb-25': 6, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-058(4B) (Building)', account: '4300132', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 4, 'Feb-25': 8, 'Jan-25': 9, status: 'active' },
            { label: 'Z3-62(5) (Building)', account: '4300133', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'D 62-Building Common Meter', account: '4300142', type: 'D_Building_Common', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'D 53-Building Common Meter', account: '4300201', type: 'D_Building_Common', 'Apr-25': 2, 'Mar-25': 7, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'D 54-Building Common Meter', account: '4300202', type: 'D_Building_Common', 'Apr-25': 3, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'D 55-Building Common Meter', account: '4300203', type: 'D_Building_Common', 'Apr-25': 3, 'Mar-25': 2, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'D 56-Building Common Meter', account: '4300204', type: 'D_Building_Common', 'Apr-25': 3, 'Mar-25': 8, 'Feb-25': 2, 'Jan-25': 1, status: 'active' },
            { label: 'D 57-Building Common Meter', account: '4300205', type: 'D_Building_Common', 'Apr-25': 7, 'Mar-25': 4, 'Feb-25': 1, 'Jan-25': 2, status: 'active' },
            { label: 'D 58-Building Common Meter', account: '4300206', type: 'D_Building_Common', 'Apr-25': 3, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'D 59-Building Common Meter', account: '4300207', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'D 60-Building Common Meter', account: '4300208', type: 'D_Building_Common', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'D 61-Building Common Meter', account: '4300209', type: 'D_Building_Common', 'Apr-25': 2, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-53(1A) (Building)', account: '4300210', type: 'Residential (Apart)', 'Apr-25': 12, 'Mar-25': 10, 'Feb-25': 9, 'Jan-25': 8, status: 'active' },
            { label: 'Z3-53(1B) (Building)', account: '4300211', type: 'Residential (Apart)', 'Apr-25': 8, 'Mar-25': 6, 'Feb-25': 8, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-53(2A) (Building)', account: '4300212', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-53(2B) (Building)', account: '4300213', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-53(3A) (Building)', account: '4300214', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-53(3B) (Building)', account: '4300215', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 1, 'Feb-25': 3, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-53(4A) (Building)', account: '4300216', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 0, 'Feb-25': 5, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-53(5) (Building)', account: '4300217', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-54(1A) (Building)', account: '4300218', type: 'Residential (Apart)', 'Apr-25': 13, 'Mar-25': 8, 'Feb-25': 12, 'Jan-25': 11, status: 'active' },
            { label: 'Z3-54(1B) (Building)', account: '4300219', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 5, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-54(2A) (Building)', account: '4300220', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 3, 'Feb-25': 3, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-54(2B) (Building)', account: '4300221', type: 'Residential (Apart)', 'Apr-25': 14, 'Mar-25': 19, 'Feb-25': 9, 'Jan-25': 20, status: 'active' },
            { label: 'Z3-54(3A) (Building)', account: '4300222', type: 'Residential (Apart)', 'Apr-25': 8, 'Mar-25': 3, 'Feb-25': 8, 'Jan-25': 8, status: 'active' },
            { label: 'Z3-54(3B) (Building)', account: '4300223', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-54(4A) (Building)', account: '4300224', type: 'Residential (Apart)', 'Apr-25': 14, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-54(4B) (Building)', account: '4300225', type: 'Residential (Apart)', 'Apr-25': 2, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-54(5) (Building)', account: '4300226', type: 'Residential (Apart)', 'Apr-25': 19, 'Mar-25': 11, 'Feb-25': 18, 'Jan-25': 15, status: 'active' },
            { label: 'Z3-54(6) (Building)', account: '4300227', type: 'Residential (Apart)', 'Apr-25': 23, 'Mar-25': 4, 'Feb-25': 4, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-55(1A) (Building)', account: '4300228', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-55(2A) (Building)', account: '4300229', type: 'Residential (Apart)', 'Apr-25': 15, 'Mar-25': 5, 'Feb-25': 24, 'Jan-25': 23, status: 'active' },
            { label: 'Z3-55(2B) (Building)', account: '4300230', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 5, 'Feb-25': 4, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-55(3A) (Building)', account: '4300231', type: 'Residential (Apart)', 'Apr-25': 10, 'Mar-25': 4, 'Feb-25': 8, 'Jan-25': 17, status: 'active' },
            { label: 'Z3-55(3B) (Building)', account: '4300232', type: 'Residential (Apart)', 'Apr-25': 7, 'Mar-25': 5, 'Feb-25': 3, 'Jan-25': 7, status: 'active' },
            { label: 'Z3-55(4A) (Building)', account: '4300233', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 7, 'Feb-25': 7, 'Jan-25': 4, status: 'active' },
            { label: 'Z3-55(4B) (Building)', account: '4300234', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 5, 'Feb-25': 5, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-55(5) (Building)', account: '4300235', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-55(6) (Building)', account: '4300236', type: 'Residential (Apart)', 'Apr-25': 129, 'Mar-25': 68, 'Feb-25': 5, 'Jan-25': 7, status: 'active' },
            { label: 'Z3-56(1A) (Building)', account: '4300237', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 50, status: 'inactive' },
            { label: 'Z3-56(1B) (Building)', account: '4300238', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 1, status: 'inactive' },
            { label: 'Z3-56(2A) (Building)', account: '4300239', type: 'Residential (Apart)', 'Apr-25': 4, 'Mar-25': 0, 'Feb-25': 7, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-56(2B) (Building)', account: '4300240', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 8, 'Feb-25': 1, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-56(3A) (Building)', account: '4300241', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-56(3B) (Building)', account: '4300242', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-56(4A) (Building)', account: '4300243', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 4, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-56(4B) (Building)', account: '4300244', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 7, status: 'inactive' },
            { label: 'Z3-56(5) (Building)', account: '4300245', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 2, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-56(6) (Building)', account: '4300246', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 17, 'Feb-25': 3, 'Jan-25': 14, status: 'active' },
            { label: 'Z3-57(1A) (Building)', account: '4300247', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 8, 'Jan-25': 2, status: 'inactive' },
            { label: 'Z3-57(1B) (Building)', account: '4300248', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-57(2A) (Building)', account: '4300249', type: 'Residential (Apart)', 'Apr-25': 4, 'Mar-25': 5, 'Feb-25': 5, 'Jan-25': 4, status: 'active' },
            { label: 'Z3-57(2B) (Building)', account: '4300250', type: 'Residential (Apart)', 'Apr-25': 8, 'Mar-25': 5, 'Feb-25': 1, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-57(3A) (Building)', account: '4300251', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 5, 'Feb-25': 4, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-57(3B) (Building)', account: '4300252', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-57(4A) (Building)', account: '4300253', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-57(4B) (Building)', account: '4300254', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 0, 'Feb-25': 3, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-57(5) (Building)', account: '4300255', type: 'Residential (Apart)', 'Apr-25': 21, 'Mar-25': 7, 'Feb-25': 14, 'Jan-25': 17, status: 'active' },
            { label: 'Z3-57(6) (Building)', account: '4300256', type: 'Residential (Apart)', 'Apr-25': 14, 'Mar-25': 22, 'Feb-25': 26, 'Jan-25': 10, status: 'active' },
            { label: 'Z3-58(1A) (Building)', account: '4300257', type: 'Residential (Apart)', 'Apr-25': 4, 'Mar-25': 4, 'Feb-25': 2, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-58(2A) (Building)', account: '4300258', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 4, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-58(2B) (Building)', account: '4300259', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 1, 'Feb-25': 5, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-58(3A) (Building)', account: '4300260', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-58(4A) (Building)', account: '4300261', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-58(6) (Building)', account: '4300262', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 3, 'Feb-25': 3, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-59(1A) (Building)', account: '4300263', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 4, 'Feb-25': 7, 'Jan-25': 7, status: 'active' },
            { label: 'Z3-59(1B) (Building)', account: '4300264', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 4, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-59(2A) (Building)', account: '4300265', type: 'Residential (Apart)', 'Apr-25': 14, 'Mar-25': 14, 'Feb-25': 13, 'Jan-25': 9, status: 'active' },
            { label: 'Z3-59(2B) (Building)', account: '4300266', type: 'Residential (Apart)', 'Apr-25': 16, 'Mar-25': 10, 'Feb-25': 15, 'Jan-25': 13, status: 'active' },
            { label: 'Z3-59(3B) (Building)', account: '4300267', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 3, 'Feb-25': 4, 'Jan-25': 1, status: 'active' },
            { label: 'Z3-59(4A) (Building)', account: '4300268', type: 'Residential (Apart)', 'Apr-25': 7, 'Mar-25': 6, 'Feb-25': 8, 'Jan-25': 10, status: 'active' },
            { label: 'Z3-59(5) (Building)', account: '4300269', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 7, 'Feb-25': 3, 'Jan-25': 12, status: 'active' },
            { label: 'Z3-59(6) (Building)', account: '4300270', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 1, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-60(1A) (Building)', account: '4300271', type: 'Residential (Apart)', 'Apr-25': 6, 'Mar-25': 6, 'Feb-25': 7, 'Jan-25': 3, status: 'active' },
            { label: 'Z3-60(2A) (Building)', account: '4300272', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 3, 'Feb-25': 4, 'Jan-25': 4, status: 'active' },
            { label: 'Z3-60(3A) (Building)', account: '4300273', type: 'Residential (Apart)', 'Apr-25': 10, 'Mar-25': 15, 'Feb-25': 10, 'Jan-25': 5, status: 'active' },
            { label: 'Z3-60(4A) (Building)', account: '4300274', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 5, 'Feb-25': 5, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-60(5) (Building)', account: '4300275', type: 'Residential (Apart)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z3-60(6) (Building)', account: '4300276', type: 'Residential (Apart)', 'Apr-25': 49, 'Mar-25': 39, 'Feb-25': 38, 'Jan-25': 20, status: 'active' },
            { label: 'Z3-61(1A) (Building)', account: '4300277', type: 'Residential (Apart)', 'Apr-25': 3, 'Mar-25': 3, 'Feb-25': 0, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-61(1B) (Building)', account: '4300278', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 2, 'Feb-25': 9, 'Jan-25': 9, status: 'active' },
            { label: 'Z3-61(2A) (Building)', account: '4300279', type: 'Residential (Apart)', 'Apr-25': 11, 'Mar-25': 11, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-61(2B) (Building)', account: '4300280', type: 'Residential (Apart)', 'Apr-25': 1, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-61(3A) (Building)', account: '4300281', type: 'Residential (Apart)', 'Apr-25': 23, 'Mar-25': 19, 'Feb-25': 7, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-61(3B) (Building)', account: '4300282', type: 'Residential (Apart)', 'Apr-25': 5, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Z3-61(4A) (Building)', account: '4300283', type: 'Residential (Apart)', 'Apr-25': 9, 'Mar-25': 5, 'Feb-25': 11, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-61(4B) (Building)', account: '4300284', type: 'Residential (Apart)', 'Apr-25': 4, 'Mar-25': 8, 'Feb-25': 5, 'Jan-25': 2, status: 'active' },
            { label: 'Z3-61(5) (Building)', account: '4300285', type: 'Residential (Apart)', 'Apr-25': 2, 'Mar-25': 1, 'Feb-25': 0, 'Jan-25': 6, status: 'active' },
            { label: 'Z3-61(6) (Building)', account: '4300286', type: 'Residential (Apart)', 'Apr-25': 17, 'Mar-25': 17, 'Feb-25': 16, 'Jan-25': 16, status: 'active' },
            { label: 'Irrigation Tank 02 (Z03)', account: '4300320', type: 'IRR_Services', 'Apr-25': 15, 'Mar-25': 43, 'Feb-25': 47, 'Jan-25': 49, status: 'active' }
        ]
    },
    'Zone_05': {
        name: 'Zone 05',
        'Jan-24': { bulk: 4286, individual: 2081, loss: 2205 },
        'Feb-24': { bulk: 3897, individual: 1652, loss: 2245 },
        'Mar-24': { bulk: 4127, individual: 1480, loss: 2647 },
        'Apr-24': { bulk: 4911, individual: 1896, loss: 3015 },
        'May-24': { bulk: 2639, individual: 1400, loss: 1239 },
        'Jun-24': { bulk: 4992, individual: 2147, loss: 2845 },
        'Jul-24': { bulk: 5305, individual: 2444, loss: 2861 },
        'Aug-24': { bulk: 4039, individual: 2150, loss: 1889 },
        'Sep-24': { bulk: 2736, individual: 1669, loss: 1067 },
        'Oct-24': { bulk: 3383, individual: 2021, loss: 1362 },
        'Nov-24': { bulk: 1438, individual: 1564, loss: -126 },
        'Dec-24': { bulk: 3788, individual: 1841, loss: 1947 },
        'Jan-25': { bulk: 4267, individual: 1827, loss: 2440 },
        'Feb-25': { bulk: 4231, individual: 1864, loss: 2367 },
        'Mar-25': { bulk: 3862, individual: 1184, loss: 2678 },
        'Apr-25': { bulk: 3737, individual: 1625, loss: 2112 },
        meters: [
            { label: 'Z5-17', account: '4300001', type: 'Residential (Villa)', 'Apr-25': 90, 'Mar-25': 81, 'Feb-25': 80, 'Jan-25': 112, status: 'active' },
            { label: 'Z5-13', account: '4300058', type: 'Residential (Villa)', 'Apr-25': 120, 'Mar-25': 89, 'Feb-25': 106, 'Jan-25': 72, status: 'active' },
            { label: 'Z5-14', account: '4300059', type: 'Residential (Villa)', 'Apr-25': 93, 'Mar-25': 77, 'Feb-25': 93, 'Jan-25': 71, status: 'active' },
            { label: 'Z5-5', account: '4300146', type: 'Residential (Villa)', 'Apr-25': 5, 'Mar-25': 2, 'Feb-25': 6, 'Jan-25': 3, status: 'active' },
            { label: 'Z5-30', account: '4300147', type: 'Residential (Villa)', 'Apr-25': 113, 'Mar-25': 71, 'Feb-25': 87, 'Jan-25': 65, status: 'active' },
            { label: 'Z5-2', account: '4300148', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z5-10', account: '4300149', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 37, status: 'inactive' },
            { label: 'Z5-4', account: '4300150', type: 'Residential (Villa)', 'Apr-25': 49, 'Mar-25': 35, 'Feb-25': 98, 'Jan-25': 81, status: 'active' },
            { label: 'Z5-6', account: '4300151', type: 'Residential (Villa)', 'Apr-25': 5, 'Mar-25': 10, 'Feb-25': 3, 'Jan-25': 6, status: 'active' },
            { label: 'Z5 020', account: '4300152', type: 'Residential (Villa)', 'Apr-25': 164, 'Mar-25': 147, 'Feb-25': 30, 'Jan-25': 25, status: 'active' },
            { label: 'Z5-23', account: '4300153', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 19, 'Feb-25': 22, 'Jan-25': 0, status: 'active' },
            { label: 'Z5-15', account: '4300154', type: 'Residential (Villa)', 'Apr-25': 23, 'Mar-25': 16, 'Feb-25': 19, 'Jan-25': 35, status: 'active' },
            { label: 'Z5-9', account: '4300155', type: 'Residential (Villa)', 'Apr-25': 56, 'Mar-25': 40, 'Feb-25': 49, 'Jan-25': 38, status: 'active' },
            { label: 'Z5-26', account: '4300156', type: 'Residential (Villa)', 'Apr-25': 69, 'Mar-25': 16, 'Feb-25': 41, 'Jan-25': 61, status: 'active' },
            { label: 'Z5-25', account: '4300157', type: 'Residential (Villa)', 'Apr-25': 71, 'Mar-25': 10, 'Feb-25': 24, 'Jan-25': 37, status: 'active' },
            { label: 'Z5-31', account: '4300158', type: 'Residential (Villa)', 'Apr-25': 16, 'Mar-25': 14, 'Feb-25': 24, 'Jan-25': 33, status: 'active' },
            { label: 'Z5-33', account: '4300159', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 24, 'Feb-25': 0, 'Jan-25': 2, status: 'active' },
            { label: 'Z5-29', account: '4300160', type: 'Residential (Villa)', 'Apr-25': 20, 'Mar-25': 21, 'Feb-25': 66, 'Jan-25': 49, status: 'active' },
            { label: 'Z5-28', account: '4300161', type: 'Residential (Villa)', 'Apr-25': 8, 'Mar-25': 9, 'Feb-25': 21, 'Jan-25': 50, status: 'active' },
            { label: 'Z5-32', account: '4300162', type: 'Residential (Villa)', 'Apr-25': 72, 'Mar-25': 71, 'Feb-25': 119, 'Jan-25': 59, status: 'active' },
            { label: 'Z5-22', account: '4300163', type: 'Residential (Villa)', 'Apr-25': 243, 'Mar-25': 186, 'Feb-25': 40, 'Jan-25': 15, status: 'active' },
            { label: 'Z5-7', account: '4300164', type: 'Residential (Villa)', 'Apr-25': 7, 'Mar-25': 14, 'Feb-25': 26, 'Jan-25': 0, status: 'active' },
            { label: 'Z5-27', account: '4300165', type: 'Residential (Villa)', 'Apr-25': 12, 'Mar-25': 19, 'Feb-25': 13, 'Jan-25': 36, status: 'active' },
            { label: 'Z5-12', account: '4300166', type: 'Residential (Villa)', 'Apr-25': 66, 'Mar-25': 40, 'Feb-25': 47, 'Jan-25': 44, status: 'active' },
            { label: 'Z5 024', account: '4300167', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 68, status: 'inactive' },
            { label: 'Z5 016', account: '4300168', type: 'Residential (Villa)', 'Apr-25': 51, 'Mar-25': 37, 'Feb-25': 29, 'Jan-25': 27, status: 'active' },
            { label: 'Z5-21', account: '4300169', type: 'Residential (Villa)', 'Apr-25': 58, 'Mar-25': 34, 'Feb-25': 22, 'Jan-25': 25, status: 'active' },
            { label: 'Z5-3', account: '4300170', type: 'Residential (Villa)', 'Apr-25': 100, 'Mar-25': 67, 'Feb-25': 86, 'Jan-25': 149, status: 'active' },
            { label: 'Z5 019', account: '4300171', type: 'Residential (Villa)', 'Apr-25': 2, 'Mar-25': 6, 'Feb-25': 7, 'Jan-25': 5, status: 'active' },
            { label: 'Z5-1', account: '4300172', type: 'Residential (Villa)', 'Apr-25': 5, 'Mar-25': 4, 'Feb-25': 5, 'Jan-25': 5, status: 'active' },
            { label: 'Z5-11', account: '4300173', type: 'Residential (Villa)', 'Apr-25': 3, 'Mar-25': 3, 'Feb-25': 45, 'Jan-25': 30, status: 'active' },
            { label: 'Z5-18', account: '4300174', type: 'Residential (Villa)', 'Apr-25': 37, 'Mar-25': 11, 'Feb-25': 12, 'Jan-25': 8, status: 'active' },
            { label: 'Z5-8', account: '4300175', type: 'Residential (Villa)', 'Apr-25': 67, 'Mar-25': 11, 'Feb-25': 12, 'Jan-25': 6, status: 'active' },
            { label: 'Irrigation Tank 03 (Z05)', account: '4300321', type: 'IRR_Services', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' }
        ]
    },
    'Zone_08': {
        name: 'Zone 08',
        'Jan-24': { bulk: 2170, individual: 1415, loss: 755 },
        'Feb-24': { bulk: 1825, individual: 1150, loss: 675 },
        'Mar-24': { bulk: 2021, individual: 1430, loss: 591 },
        'Apr-24': { bulk: 2753, individual: 2010, loss: 743 },
        'May-24': { bulk: 2722, individual: 1651, loss: 1071 },
        'Jun-24': { bulk: 3193, individual: 2062, loss: 1131 },
        'Jul-24': { bulk: 3639, individual: 2301, loss: 1338 },
        'Aug-24': { bulk: 3957, individual: 2675, loss: 1282 },
        'Sep-24': { bulk: 3947, individual: 2388, loss: 1559 },
        'Oct-24': { bulk: 4296, individual: 2448, loss: 1848 },
        'Nov-24': { bulk: 3569, individual: 2238, loss: 1331 },
        'Dec-24': { bulk: 3018, individual: 1982, loss: 1036 },
        'Jan-25': { bulk: 1547, individual: 1349, loss: 198 },
        'Feb-25': { bulk: 1498, individual: 1275, loss: 223 },
        'Mar-25': { bulk: 2605, individual: 2356, loss: 249 },
        'Apr-25': { bulk: 3203, individual: 1053, loss: 2150 },
        meters: [
            { label: 'Z8-11', account: '4300023', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 1, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-13', account: '4300024', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-1', account: '4300188', type: 'Residential (Villa)', 'Apr-25': 16, 'Mar-25': 3, 'Feb-25': 2, 'Jan-25': 1, status: 'active' },
            { label: 'Z8-2', account: '4300189', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-3', account: '4300190', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-4', account: '4300191', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-6', account: '4300192', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 1, status: 'inactive' },
            { label: 'Z8-7', account: '4300193', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-8', account: '4300194', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-10', account: '4300195', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-12', account: '4300196', type: 'Residential (Villa)', 'Apr-25': 267, 'Mar-25': 249, 'Feb-25': 192, 'Jan-25': 236, status: 'active' },
            { label: 'Z8-14', account: '4300197', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Z8-15', account: '4300198', type: 'Residential (Villa)', 'Apr-25': 125, 'Mar-25': 70, 'Feb-25': 61, 'Jan-25': 99, status: 'active' },
            { label: 'Z8-16', account: '4300199', type: 'Residential (Villa)', 'Apr-25': 98, 'Mar-25': 54, 'Feb-25': 72, 'Jan-25': 67, status: 'active' },
            { label: 'Z8-17', account: '4300200', type: 'Residential (Villa)', 'Apr-25': 207, 'Mar-25': 171, 'Feb-25': 162, 'Jan-25': 164, status: 'active' },
            { label: 'Z8-5', account: '4300287', type: 'Residential (Villa)', 'Apr-25': 336, 'Mar-25': 313, 'Feb-25': 341, 'Jan-25': 208, status: 'active' },
            { label: 'Z8-9', account: '4300288', type: 'Residential (Villa)', 'Apr-25': 4, 'Mar-25': 5, 'Feb-25': 12, 'Jan-25': 5, status: 'active' },
            { label: 'Z8-18', account: '4300289', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 336, 'Feb-25': 111, 'Jan-25': 122, status: 'active' },
            { label: 'Z8-19', account: '4300290', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 231, 'Feb-25': 87, 'Jan-25': 104, status: 'active' },
            { label: 'Z8-20', account: '4300291', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 312, 'Feb-25': 110, 'Jan-25': 146, status: 'active' },
            { label: 'Z8-21', account: '4300292', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 276, 'Feb-25': 72, 'Jan-25': 99, status: 'active' },
            { label: 'Z8-22', account: '4300293', type: 'Residential (Villa)', 'Apr-25': 0, 'Mar-25': 336, 'Feb-25': 156, 'Jan-25': 225, status: 'active' }
        ]
    },
    'Zone_VS': {
        name: 'Village Square',
        'Jan-24': { bulk: 26, individual: 0, loss: 26 },
        'Feb-24': { bulk: 19, individual: 1, loss: 18 },
        'Mar-24': { bulk: 72, individual: 16, loss: 56 },
        'Apr-24': { bulk: 60, individual: 49, loss: 11 },
        'May-24': { bulk: 125, individual: 33, loss: 92 },
        'Jun-24': { bulk: 277, individual: 191, loss: 86 },
        'Jul-24': { bulk: 143, individual: 148, loss: -5 },
        'Aug-24': { bulk: 137, individual: 125, loss: 12 },
        'Sep-24': { bulk: 145, individual: 34, loss: 111 },
        'Oct-24': { bulk: 63, individual: 49, loss: 14 },
        'Nov-24': { bulk: 34, individual: 53, loss: -19 },
        'Dec-24': { bulk: 17, individual: 31, loss: -14 },
        'Jan-25': { bulk: 14, individual: 33, loss: -19 },
        'Feb-25': { bulk: 12, individual: 25, loss: -13 },
        'Mar-25': { bulk: 21, individual: 54, loss: -33 },
        'Apr-25': { bulk: 13, individual: 15, loss: -2 },
        meters: [
            { label: 'Irrigation Tank - VS', account: '4300326', type: 'IRR_Services', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Coffee 1 (GF Shop No.591)', account: '4300327', type: 'Retail', 'Apr-25': -3, 'Mar-25': 3, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Coffee 2 (GF Shop No.594 A)', account: '4300329', type: 'Retail', 'Apr-25': 5, 'Mar-25': 5, 'Feb-25': 3, 'Jan-25': 2, status: 'active' },
            { label: 'Supermarket (FF Shop No.591)', account: '4300330', type: 'Retail', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Pharmacy (FF Shop No.591 A)', account: '4300331', type: 'Retail', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Laundry Services (FF Shop No.593)', account: '4300332', type: 'Retail', 'Apr-25': 0, 'Mar-25': 22, 'Feb-25': 25, 'Jan-25': 33, status: 'active' },
            { label: 'Shop No.593 A', account: '4300333', type: 'Retail', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: 'Hotel Main Building', account: '4300334', type: 'Retail', 'Apr-25': 13, 'Mar-25': 51, 'Feb-25': 15, 'Jan-25': 6, status: 'active' }
        ]
    },
    'Main_Bulk': {
        name: 'Main Bulk (A2)',
        'Jan-24': { bulk: 32803, A2: 28689, loss: 4114 },
        'Feb-24': { bulk: 27996, A2: 25073, loss: 2923 },
        'Mar-24': { bulk: 23860, A2: 24007, loss: -147 },
        'Apr-24': { bulk: 31869, A2: 28713, loss: 3156 },
        'May-24': { bulk: 30737, A2: 28089, loss: 2648 },
        'Jun-24': { bulk: 41953, A2: 34626, loss: 7327 },
        'Jul-24': { bulk: 35166, A2: 34689, loss: 477 },
        'Aug-24': { bulk: 35420, A2: 31598, loss: 3822 },
        'Sep-24': { bulk: 41341, A2: 31813, loss: 9528 },
        'Oct-24': { bulk: 31519, A2: 34525, loss: -3006 },
        'Nov-24': { bulk: 35290, A2: 28704, loss: 6586 },
        'Dec-24': { bulk: 36733, A2: 31109, loss: 5624 },
        'Jan-25': { bulk: 32580, A2: 35325, loss: -2745 },
        'Feb-25': { bulk: 44043, A2: 35811, loss: 8232 },
        'Mar-25': { bulk: 34915, A2: 39565, loss: -4650 },
        'Apr-25': { bulk: 46039, A2: 45863, loss: 176 },
        meters: [
            { label: 'Irrigation Tank 04 - (Z08)', account: '4300294', type: 'IRR_Services', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' },
            { label: '"Sales Center  Common Building "', account: '4300295', type: 'MB_Common', 'Apr-25': 67, 'Mar-25': 37, 'Feb-25': 68, 'Jan-25': 76, status: 'active' },
            { label: 'Building (Security)', account: '4300297', type: 'MB_Common', 'Apr-25': 16, 'Mar-25': 13, 'Feb-25': 18, 'Jan-25': 17, status: 'active' },
            { label: 'Building (ROP)', account: '4300299', type: 'MB_Common', 'Apr-25': 20, 'Mar-25': 19, 'Feb-25': 21, 'Jan-25': 23, status: 'active' },
            { label: 'Community Mgmt - Technical Zone, STP', account: '4300336', type: 'MB_Common', 'Apr-25': 35, 'Mar-25': 25, 'Feb-25': 37, 'Jan-25': 29, status: 'active' },
            { label: 'PHASE 02, MAIN ENTRANCE (Infrastructure)', account: '4300338', type: 'MB_Common', 'Apr-25': 7, 'Mar-25': 6, 'Feb-25': 8, 'Jan-25': 11, status: 'active' },
            { label: 'Irrigation- Controller UP', account: '4300340', type: 'IRR_Services', 'Apr-25': 1000, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'active' },
            { label: 'Irrigation- Controller DOWN', account: '4300341', type: 'IRR_Services', 'Apr-25': 411, 'Mar-25': 283, 'Feb-25': 239, 'Jan-25': 159, status: 'active' },
            { label: 'Al Adrak Construction', account: '4300347', type: 'Retail', 'Apr-25': 600, 'Mar-25': 580, 'Feb-25': 520, 'Jan-25': 597, status: 'active' },
            { label: 'Al Adrak Camp', account: '4300348', type: 'Retail', 'Apr-25': 1000, 'Mar-25': 1161, 'Feb-25': 702, 'Jan-25': 1038, status: 'active' },
            { label: 'Hotel Main Building', account: '4300334', type: 'Retail', 'Apr-25': 27676, 'Mar-25': 22151, 'Feb-25': 19482, 'Jan-25': 18048, status: 'active' },
            { label: 'Irrigation Tank 01 (Inlet)', account: '4300323', type: 'IRR_Services', 'Apr-25': 0, 'Mar-25': 0, 'Feb-25': 0, 'Jan-25': 0, status: 'inactive' }
        ]
    }
};

// Utility functions for data analysis
function calculateWaterBalance(data) {
    const balance = {};
    Object.keys(data).forEach(month => {
        const monthData = data[month];
        balance[month] = {
            totalSupply: monthData.L1,
            totalDistribution: monthData.L2 + monthData.DC,
            systemLoss: monthData.L1 - (monthData.L2 + monthData.DC),
            zoneConsumption: monthData.L3,
            distributionLoss: (monthData.L2 + monthData.DC) - monthData.L3
        };
    });
    return balance;
}

function getZoneEfficiency(zoneName, month) {
    const zone = detailedZoneData[zoneName];
    if (!zone || !zone[month]) return null;
    
    const monthData = zone[month];
    const { bulk, loss } = monthData;
    
    // For Main_Bulk, use A2 instead of individual
    const distributed = zoneName === 'Main_Bulk' ? monthData.A2 : monthData.individual;
    
    return {
        efficiency: ((distributed / bulk) * 100).toFixed(2) + '%',
        lossPercentage: ((loss / bulk) * 100).toFixed(2) + '%',
        distributed: distributed,
        loss: loss
    };
}

function getActiveMeters(zoneName) {
    const zone = detailedZoneData[zoneName];
    if (!zone) return { active: 0, inactive: 0, total: 0 };
    
    const active = zone.meters.filter(m => m.status === 'active').length;
    const inactive = zone.meters.filter(m => m.status === 'inactive').length;
    
    return { active, inactive, total: zone.meters.length };
}

console.log('Water Management System Data Loaded Successfully');
console.log('Available zones:', Object.keys(detailedZoneData));
console.log('Data period: January 2024 - April 2025');
console.log('Total meters tracked:', Object.values(detailedZoneData).reduce((sum, zone) => sum + zone.meters.length, 0));

// Key Definitions:
// L1: Main bulk supply meter
// L2: Sum of all zone bulk meters  
// DC: Direct connections from main bulk
// L3: Sum of all individual meters
// A2: Total distribution (L2 + DC) - used for Main_Bulk zone

// Example usage:
// console.log('Water Balance for Apr-25:', calculateWaterBalance(waterData)['Apr-25']);
// console.log('Zone FM Efficiency for Apr-25:', getZoneEfficiency('Zone_01_(FM)', 'Apr-25'));
// console.log('Main Bulk A2 Efficiency for Apr-25:', getZoneEfficiency('Main_Bulk', 'Apr-25'));
// console.log('Zone 03A Meter Status:', getActiveMeters('Zone_03_(A)'));

        let selectedPeriod = 'Apr-25';
        let selectedZone = 'Zone_01_(FM)';
        let selectedZoneMonth = 'Apr-25';
        let currentMeterPage = 1;
        let filteredMeters = [];
        const metersPerPage = 12;

        // Tab switching
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
            
            // Initialize content when tabs are shown
            if (tabName === 'zones') {
                updateZoneAnalysis();
            } else if (tabName === 'analysis') {
                drawTrendChart();
            } else if (tabName === 'consumers') {
                drawTypeChart();
            }
        }

        // Update calculations
        function updateCalculations() {
            const data = waterData[selectedPeriod];
            const A = data.L1;  // Main bulk
            const B = data.L2 + data.DC;  // Zone bulks + Direct connections
            const C = data.L3 + data.DC;  // End users + Direct connections
            
            const stage1Loss = A - B;
            const stage2Loss = data.L2 - data.L3;  // Loss within zones only
            const totalLoss = A - C;  // Total system loss
            
            const stage1Percentage = (stage1Loss / A * 100).toFixed(1);
            const stage2Percentage = data.L2 > 0 ? (stage2Loss / data.L2 * 100).toFixed(1) : 0;
            const totalPercentage = (totalLoss / A * 100).toFixed(1);
            const efficiency = (100 - totalPercentage).toFixed(1);
            
            // Update DOM elements
            document.getElementById('totalSupply').textContent = A.toLocaleString();
            document.getElementById('totalDistribution').textContent = B.toLocaleString();
            document.getElementById('totalConsumption').textContent = C.toLocaleString();
            
            document.getElementById('stage1Loss').textContent = Math.abs(stage1Loss).toLocaleString();
            document.getElementById('stage1Percentage').textContent = Math.abs(stage1Percentage) + '%';
            document.getElementById('stage2Loss').textContent = stage2Loss.toLocaleString();
            document.getElementById('stage2Percentage').textContent = stage2Percentage + '%';
            document.getElementById('totalLoss').textContent = totalLoss.toLocaleString();
            document.getElementById('totalLossPercentage').textContent = totalPercentage + '%';
            
            // Update progress bars
            document.getElementById('distributionProgress').style.width = (B / A * 100) + '%';
            document.getElementById('consumptionProgress').style.width = (C / A * 100) + '%';
            
            // Update hierarchy
            document.getElementById('hierarchyL1').textContent = A.toLocaleString();
            document.getElementById('hierarchyL2').textContent = data.L2.toLocaleString();
            document.getElementById('hierarchyDC').textContent = data.DC.toLocaleString();
            document.getElementById('hierarchyEndUsers').textContent = C.toLocaleString();
            
            // Update efficiency display
            document.getElementById('efficiencyPercent').textContent = efficiency;
            document.getElementById('efficiencyBar').style.width = efficiency + '%';
            document.getElementById('deliveredPercent').textContent = efficiency + '%';
            document.getElementById('lostPercent').textContent = totalPercentage + '%';
            
            // Update stage bars for loss breakdown
            const totalLossAbs = Math.abs(totalLoss);
            const stage1LossAbs = Math.abs(stage1Loss);
            const stage2LossAbs = Math.abs(stage2Loss);
            
            if (totalLossAbs > 0) {
                const stage1Percent = (stage1LossAbs / totalLossAbs * 100).toFixed(1);
                const stage2Percent = (stage2LossAbs / totalLossAbs * 100).toFixed(1);
                document.getElementById('stage1Bar').style.width = stage1Percent + '%';
                document.getElementById('stage2Bar').style.width = stage2Percent + '%';
            } else {
                document.getElementById('stage1Bar').style.width = '50%';
                document.getElementById('stage2Bar').style.width = '50%';
            }
            
            document.getElementById('stage1Amount').textContent = stage1LossAbs.toLocaleString() + ' m³';
            document.getElementById('stage2Amount').textContent = stage2LossAbs.toLocaleString() + ' m³';
            
            // Update alert based on total loss percentage
            const alertSection = document.getElementById('alertSection');
            alertSection.innerHTML = '';
            
            const totalLossPercent = parseFloat(totalPercentage);
            if (totalLossPercent < 0) {
                alertSection.innerHTML = '<div class="alert alert-success">✅ System showing negative loss - possible meter calibration issue. Please verify readings.</div>';
            } else if (totalLossPercent < 20) {
                alertSection.innerHTML = '<div class="alert alert-success">✅ System efficiency is excellent! Total water loss (' + totalPercentage + '%) is well within industry standards.</div>';
            } else if (totalLossPercent <= 30) {
                alertSection.innerHTML = '<div class="alert alert-warning">⚠️ System efficiency needs attention. Total water loss (' + totalPercentage + '%) is approaching the upper limit.</div>';
            } else {
                alertSection.innerHTML = '<div class="alert alert-danger">🚨 Critical: Total water loss (' + totalPercentage + '%) exceeds industry standards. Immediate maintenance required.</div>';
            }
            
            // Update period display
            document.getElementById('selectedPeriod').textContent = selectedPeriod;
            
            // Calculate change from previous month
            const periods = ['Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25'];
            const currentIndex = periods.indexOf(selectedPeriod);
            if (currentIndex > 0) {
                const prevPeriod = periods[currentIndex - 1];
                const prevData = waterData[prevPeriod];
                const change = ((A - prevData.L1) / prevData.L1 * 100).toFixed(1);
                const changeElement = document.getElementById('supplyChange');
                if (parseFloat(change) >= 0) {
                    changeElement.textContent = `↑ ${change}% from ${prevPeriod}`;
                    changeElement.className = 'metric-change positive';
                } else {
                    changeElement.textContent = `↓ ${Math.abs(change)}% from ${prevPeriod}`;
                    changeElement.className = 'metric-change negative';
                }
            }
        }

        // Update zone analysis
        function updateZoneAnalysis() {
            const zone = detailedZoneData[selectedZone];
            const monthData = zone[selectedZoneMonth];
            
            // Update KPI cards
            document.getElementById('zoneBulkReading').textContent = monthData.bulk.toLocaleString();
            document.getElementById('zoneIndividualSum').textContent = monthData.individual.toLocaleString();
            document.getElementById('zoneLoss').textContent = monthData.loss.toLocaleString();
            
            // Calculate loss percentage
            const lossPercentage = monthData.bulk > 0 ? (monthData.loss / monthData.bulk * 100).toFixed(1) : 0;
            document.getElementById('zoneLossPercentage').textContent = lossPercentage + '%';
            
            // Loss is always shown in red
            document.getElementById('zoneLoss').style.color = '#cc0000';
            document.getElementById('zoneLossPercentage').style.color = '#cc0000';
            document.getElementById('zoneLossBar').style.width = Math.abs(lossPercentage) + '%';
            document.getElementById('zoneLossBar').style.background = '#cc0000';
            
            // Update the border color of loss cards
            const lossCards = document.querySelectorAll('#zones .metric-card');
            if (lossCards[2]) lossCards[2].style.borderTopColor = '#cc0000';
            if (lossCards[3]) lossCards[3].style.borderTopColor = '#cc0000';
            
            // Update performance chart
            updateZonePerformanceChart(monthData);
            
            // Reset pagination when zone/month changes
            currentMeterPage = 1;
            
            // Update meters table
            updateMetersTable(zone.meters);
        }

        // Update zone performance chart
        function updateZonePerformanceChart(monthData) {
            const maxValue = Math.max(monthData.bulk, monthData.individual, Math.abs(monthData.loss));
            
            document.getElementById('bulkBar').style.height = (monthData.bulk / maxValue * 250) + 'px';
            document.getElementById('bulkBar').querySelector('.bar-value').textContent = monthData.bulk.toLocaleString();
            
            document.getElementById('individualBar').style.height = (monthData.individual / maxValue * 250) + 'px';
            document.getElementById('individualBar').querySelector('.bar-value').textContent = monthData.individual.toLocaleString();
            
            const lossHeight = Math.abs(monthData.loss) / maxValue * 250;
            document.getElementById('lossBar').style.height = lossHeight + 'px';
            document.getElementById('lossBar').querySelector('.bar-value').textContent = monthData.loss.toLocaleString();
            document.getElementById('lossBar').querySelector('.bar-value').style.color = '#cc0000';
            document.getElementById('lossBar').style.background = '#cc0000'; // Loss is always red
            
            // Add rounded corners to all bars
            document.getElementById('bulkBar').style.borderRadius = '4px 4px 0 0';
            document.getElementById('individualBar').style.borderRadius = '4px 4px 0 0';
            document.getElementById('lossBar').style.borderRadius = '4px 4px 0 0';
        }

        // Update meters table
        function updateMetersTable(meters) {
            const searchTerm = document.getElementById('meterSearch').value.toLowerCase();
            const monthData = detailedZoneData[selectedZone][selectedZoneMonth];
            
            // Filter meters based on search
            filteredMeters = meters.filter(meter => 
                meter.label.toLowerCase().includes(searchTerm) ||
                meter.account.includes(searchTerm)
            );
            
            // Sort meters by consumption (highest first)
            filteredMeters.sort((a, b) => (b[selectedZoneMonth] || 0) - (a[selectedZoneMonth] || 0));
            
            // Update pagination info
            const totalPages = Math.ceil(filteredMeters.length / metersPerPage);
            const startIndex = (currentMeterPage - 1) * metersPerPage;
            const endIndex = Math.min(startIndex + metersPerPage, filteredMeters.length);
            const currentPageMeters = filteredMeters.slice(startIndex, endIndex);
            
            // Build table HTML
            const tbody = document.getElementById('meterTableBody');
            let html = '';
            let totalActive = 0;
            let totalInactive = 0;
            
            currentPageMeters.forEach(meter => {
                const consumption = meter[selectedZoneMonth] || 0;
                const percentage = monthData.individual > 0 ? (consumption / monthData.individual * 100) : 0;
                const isActive = consumption > 0;
                
                if (isActive) totalActive++; else totalInactive++;
                
                // Determine bar color based on consumption percentage
                let barClass = 'consumption-low';
                if (percentage > 15) barClass = 'consumption-high';
                else if (percentage > 5) barClass = 'consumption-medium';
                
                // Scale the bar width for better visualization (max 90% width)
                const scaledWidth = Math.min((percentage * 2), 90);
                const barWidth = Math.max(scaledWidth, isActive ? 20 : 0);
                
                html += `
                    <tr>
                        <td>${meter.label}</td>
                        <td>${meter.account}</td>
                        <td style="text-align: right; font-weight: ${consumption > 100 ? 'bold' : 'normal'};">
                            ${consumption.toLocaleString()}
                        </td>
                        <td>
                            ${isActive ? `
                                <div class="consumption-bar-container">
                                    <div class="consumption-bar ${barClass}" style="width: ${barWidth}%;">
                                        <span class="consumption-value">${consumption}</span>
                                    </div>
                                </div>
                            ` : `
                                <div style="padding: 2px 8px; color: #999; font-size: 0.9rem;">0</div>
                            `}
                        </td>
                    </tr>
                `;
            });
            
            if (currentPageMeters.length === 0) {
                html = '<tr><td colspan="4" style="text-align: center; color: #666;">No meters found</td></tr>';
            }
            
            tbody.innerHTML = html;
            
            // Update pagination display
            document.getElementById('showingStart').textContent = filteredMeters.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = endIndex;
            document.getElementById('totalMetersCount').textContent = filteredMeters.length;
            document.getElementById('currentPage').textContent = currentMeterPage;
            document.getElementById('totalPages').textContent = Math.max(1, totalPages);
            
            // Update pagination buttons
            const prevBtn = document.getElementById('prevPageBtn');
            const nextBtn = document.getElementById('nextPageBtn');
            
            prevBtn.disabled = currentMeterPage === 1;
            nextBtn.disabled = currentMeterPage >= totalPages;
            
            // Count all active/inactive meters in the zone (not just current page)
            let allActive = 0;
            let allInactive = 0;
            filteredMeters.forEach(meter => {
                const consumption = meter[selectedZoneMonth] || 0;
                if (consumption > 0) allActive++; else allInactive++;
            });
            
            // Update meter counts
            document.getElementById('totalMeters').textContent = filteredMeters.length;
            document.getElementById('activeMeters').textContent = allActive;
            document.getElementById('inactiveMeters').textContent = allInactive;
        }

        // Change meter page
        function changeMeterPage(direction) {
            const totalPages = Math.ceil(filteredMeters.length / metersPerPage);
            const newPage = currentMeterPage + direction;
            
            if (newPage >= 1 && newPage <= totalPages) {
                currentMeterPage = newPage;
                updateMetersTable(detailedZoneData[selectedZone].meters);
            }
        }

        // Draw trend chart
        function drawTrendChart() {
            const chartContainer = document.getElementById('trendChart');
            chartContainer.innerHTML = '';
            
            const periods = Object.keys(waterData).reverse().slice(-4);
            const maxValue = Math.max(...periods.map(p => waterData[p].L1));
            
            periods.forEach(period => {
                const data = waterData[period];
                const barContainer = document.createElement('div');
                barContainer.style.position = 'relative';
                barContainer.style.display = 'flex';
                barContainer.style.flexDirection = 'column';
                barContainer.style.alignItems = 'center';
                
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = data.L1 / maxValue * 250 + 'px';
                bar.style.background = period === selectedPeriod ? '#4E4456' : '#A596AD';
                
                const label = document.createElement('div');
                label.className = 'bar-label';
                label.textContent = period;
                
                const value = document.createElement('div');
                value.className = 'bar-value';
                value.textContent = (data.L1 / 1000).toFixed(1) + 'k';
                
                bar.appendChild(value);
                barContainer.appendChild(bar);
                barContainer.appendChild(label);
                chartContainer.appendChild(barContainer);
            });
        }

        // Draw type chart
        function drawTypeChart() {
            const chartContainer = document.getElementById('typeChart');
            chartContainer.innerHTML = '';
            
            const typeData = [
                { name: 'Hotel/DC', value: 45863, color: '#4E4456' },
                { name: 'Residential', value: 18000, color: '#7A6B84' },
                { name: 'Retail', value: 4000, color: '#A596AD' },
                { name: 'IRR Services', value: 1166, color: '#C9B8D0' }
            ];
            
            const maxValue = Math.max(...typeData.map(t => t.value));
            
            typeData.forEach(type => {
                const barContainer = document.createElement('div');
                barContainer.style.position = 'relative';
                barContainer.style.display = 'flex';
                barContainer.style.flexDirection = 'column';
                barContainer.style.alignItems = 'center';
                
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = type.value / maxValue * 200 + 'px';
                bar.style.background = type.color;
                bar.style.width = '80px';
                
                const label = document.createElement('div');
                label.className = 'bar-label';
                label.textContent = type.name;
                
                const value = document.createElement('div');
                value.className = 'bar-value';
                value.textContent = (type.value / 1000).toFixed(1) + 'k m³';
                
                bar.appendChild(value);
                barContainer.appendChild(bar);
                barContainer.appendChild(label);
                chartContainer.appendChild(barContainer);
            });
        }

        // Initialize on load
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize calculations
            updateCalculations();
            
            // Initialize zone analysis 
            updateZoneAnalysis();
            
            // Initialize zone selects if they exist
            const zoneSelect = document.getElementById('zoneSelect');
            const zoneMonthSelect = document.getElementById('zoneMonthSelect');
            const meterSearch = document.getElementById('meterSearch');
            
            if (zoneSelect) {
                zoneSelect.addEventListener('change', function(e) {
                    selectedZone = e.target.value;
                    currentMeterPage = 1; // Reset pagination
                    updateZoneAnalysis();
                });
            }
            
            if (zoneMonthSelect) {
                zoneMonthSelect.addEventListener('change', function(e) {
                    selectedZoneMonth = e.target.value;
                    currentMeterPage = 1; // Reset pagination
                    updateZoneAnalysis();
                });
            }
            
            if (meterSearch) {
                meterSearch.addEventListener('input', function(e) {
                    currentMeterPage = 1; // Reset to first page when searching
                    if (detailedZoneData[selectedZone]) {
                        updateMetersTable(detailedZoneData[selectedZone].meters);
                    }
                });
            }

            // Period change handler
            document.getElementById('periodSelect').addEventListener('change', function(e) {
                selectedPeriod = e.target.value;
                updateCalculations();
            });
        });
    </script>
</body>
</html>