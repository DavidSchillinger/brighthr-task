## Observations - Task

- Covers:
	- Bootstrapping a new application
	- Component rendering
	- HTTP requests
	- Testing (TDD requested)
- Doesn't explicitly ask for:
	- Complex state management
	- Data mutations
	- Error handling
	- Localisation
	- Styling
	- Routing
	- SSR

## Observations - Endpoints

- `/conflict` doesn't seem to be available as a list, this creates an API request waterfall and requires an additional
  request for each absence.

## Assumptions

- Any third party package is acceptable (including TS)
- Basic styling is acceptable (now screenshots included with task)
- All fields returned from the API are required
- CI/CD configuration is out-of-scope for this test
- Sorting should only work one field at a time
- Sorting should default to the employee name, ascending
- Showing only the first 5 absences is acceptable for this test (to avoid hundreds of http requests)
