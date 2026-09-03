const pageContent = `
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .header-text {
            text-align: center;
            margin-bottom: 20px;
        }
        
        h2 { margin: 5px 0; font-size: 24px; }
        h3 { margin: 5px 0; font-size: 20px; font-weight: normal; font-weight: bold;}

        table {
            border-collapse: collapse;
            width: 100%;
            max-width: 1100px;
            text-align: center;
            margin-bottom: 30px;
        }

        th, td {
            border: 1px solid black;
            padding: 12px 8px;
            vertical-align: middle;
        }

        th {
            background-color: #ffffff;
            font-weight: bold;
        }

        /* Color Coding for Subjects */
        .cs3101 { background-color: #add8e6; } /* Light Blue */
        .cs3102 { background-color: #98fb98; } /* Pale Green */
        .cs3103 { background-color: #ffb6c1; } /* Light Pink */
        .cs3104 { background-color: #fffacd; } /* Lemon Chiffon */
        .cs3122 { background-color: #dda0dd; } /* Plum */
        .cs3171 { background-color: #ffa07a; } /* Light Salmon */
        .cs3172 { background-color: #e0ffff; } /* Light Cyan */
        .cs3182 { background-color: #f5deb3; } /* Wheat */

        /* Print Button Styling */
        button {
            padding: 12px 24px;
            background-color: #0056b3;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background-color: #004494;
        }

        /* Print Media Query: Hides the button when printing and forces colors to show */
        @media print {
            button { 
                display: none; 
            }
            body { 
                /* Forces the printer to print the background colors of the table cells */
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact; 
            }
        }
    </style>

    <div class="header-text">
        <h2>Department of CST, IIEST Shibpur</h2>
        <h3>Class Routine, B. Tech. 5<sup>th</sup> Semester, July 2026</h3>
    </div>

    <table>
        <tr>
            <th>UG<br>5<sup>th</sup> SEM</th>
            <th>1<sup>st</sup> P<br>9.00-9.55</th>
            <th>2<sup>nd</sup> P<br>9.55-10.50</th>
            <th>3<sup>rd</sup> P<br>10.50-11.45</th>
            <th>4<sup>th</sup> P<br>11.45-12.40</th>
            <th>5<sup>th</sup> P<br>1.50-2.45</th>
            <th>6<sup>th</sup> P<br>2.45-3.40</th>
            <th>7<sup>th</sup> P<br>3.40-4.35</th>
        </tr>
        <tr>
            <td>MON</td>
            <td colspan="2"></td>
            <td colspan="2" class="cs3101">CS3101 (MH)<br>(CST Seminar Hall)</td>
            <td colspan="3" class="cs3171">CS3171 (H/W Lab)<br>Gx (MH, BKS) (CSD-204)</td>
        </tr>
        <tr>
            <td>TUE</td>
            <td></td>
            <td class="cs3102">CS3102 (SDB)<br>(CSD 205)</td>
            <td colspan="2" class="cs3122">CS 3122 (TP)<br>(CSD 205)</td>
            <td colspan="2" class="cs3103">CS3103 (BKS)<br>(CST Seminar Hall)</td>
            <td></td>
        </tr>
        <tr>
            <td>WED</td>
            <td></td>
            <td class="cs3103">CS3103 (BKS)<br>(CST Seminar Hall)</td>
            <td colspan="2" class="cs3104">CS3104 (NG)<br>(CST Seminar Hall)</td>
            <td colspan="3" class="cs3172">CS3172 (S/W Lab)<br>(SDB, NG, AB)<br>(CSD-2&SWL-04)</td>
        </tr>
        <tr>
            <td>THURS</td>
            <td></td>
            <td class="cs3104">CS3104 (NG)<br>(CSD205)</td>
            <td colspan="2" class="cs3102">CS3102<br>(SDB)<br>(CSD205)</td>
            <td colspan="3" class="cs3171">CS3171 (H/W Lab)<br>Gy (MH, BKS) (CSD-204)</td>
        </tr>
        <tr>
            <td>FRI</td>
            <td></td>
            <td colspan="2" class="cs3101">CS3101<br>(MH)<br>(CST Seminar Hall)</td>
            <td class="cs3122">CS 3122<br>(TP) (CST<br>Seminar Hall)</td>
            <td colspan="3" class="cs3182">CS 3182 (S/W Lab)<br>(TP, AS, SKM)<br>(CSD-2&SWL-04)</td>
        </tr>
    </table>

    <!-- The built-in JS window.print() function triggers the browser's print dialog -->
    <button onclick="window.print()">Print Timetable</button>
`;

document.write(pageContent);