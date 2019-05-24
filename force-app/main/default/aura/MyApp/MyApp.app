<aura:application implements="ltng:allowGuestAccess" extends="force:slds">
	<aura:set attribute="title" value="Simple Page"/>
    <aura:set attribute="loadingText" value="Loading..."/>
    <!--    
        body {
            background-color: black;
        }
    
        .auraMsgBox {
            background-color: #000060;
            min-width: 160px;
            min-height: 160px;
            border: none;
            box-shadow: none;
        }
    
        .auraMsgBox .logo {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABGCAYAAACt15azAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA6hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNS0wNi0yOVQyMTowNjoxOTwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjMuMjwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj41PC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNl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');
            background-repeat: no-repeat;
            background-position: center center;
            height: 100px;
        }
    
        .auraMsgBox h2 {
            color: white;
        }    
    -->
    <c:MyBookApp/>
</aura:application>