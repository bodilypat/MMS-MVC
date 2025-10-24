<?php
/* app/controllers/AppointmentController.php */

require_once __DIR__ .'/../Models/Appointment.php';
require_once __DIR__ .'/../Services/AppointmentService.php';
require_once __DIR__ .'/../helpers/ResponseHelper.php';

class AppointmentController {
    private Appointment $model;

    public function __construct(PDO $pdo)
    {
        $this->model = new Appointment($pdo);
    }

    /* Handle API request */
	public function handleRequest(string $method, array $data = [], array $queryParams = []): void{
		try {
			switch (strtoupper($method)){
				case 'GET':
					$this->handleGet($queryParams);
					break;
				case 'POST':
					$this->handlePost($data);
					break;
				case 'PUT':
					$this->handlePut($data);
					break;
				case 'DELETE':
					$this->handleDelete($data);
					break;
				default:
					sendResponse(405, ['message' => 'Method Not Allowed']);
					break;
			}
		} catch (Exception $e) {
			sendResponse(500, [
				'message' => 'Internal Server Error',
				'error' => $e->getMessage()
			]);
		}
	}

	/* GET/ appointments or GET / appointments?id = {id} */
	private function handleGet(array $queryParams): void{
		if (!empty($queryParams['appointment_id'])) {
			$appointmentId = (int)$queryParams['appointment_id'];
			$appointment = $this->model->getById($appointmentId);

			if (!$appointment) {
				sendResponse(404, ['message' => 'Appointment not found']);
				return;
			}
			sendResponse(200, $appointment);
		} else {
			$appointments = $this->model->getAll();
			sendResponse(200, $appointments);
		}
	}

	/* POST / appointment */

	private function handlePost(array $data): void {
		$required = ['date', 'time', 'patient_id', 'doctor_id'];
		foreach ($required as $field) {
			if (empty($data[$field])) {
				sendReponse(400, ['message' => "Missing required field: $field"]);
				return;
			}
		}
		if ($this->model->create($data)){
			sendResponse(201, ['message' => 'Appointment created']);
		} else {
			sendResponse(500, ['message' => 'Failed to create appointment']);
		}
	}

	/* PUT/ appointments/{id} */
	private function handlePut(array $data): void {
		if (empty($data['appointment'])){
			sendResponse(200, ['message' => 'Appointment updated']);
		} else {
			sendResponse(500, ['message' => 'Failed to update appointment']);
		}
	}

	/* DELETE / appointments/{id} */
	private function handleDelete(array $data): void {
		if (empty($data['appointment_id'])){
			sendResponse(400, ['message' => 'Missing appointment ID']);
			return;
		}
	
		if ($this->model->delete((int)$data['appointment_id'])){
			sendResponse(204, ['message' => 'Appointment deleted']);
		} else {
			sendReponse(500, ['message' => 'Failed to delete appointment']);
		}
	}
}
?>