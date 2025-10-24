<?php

/* app/Models/Appointment.php */
require_once 'BaseModel.php';

class Appointment extends BaseModel {
    protected string $table = 'appointments';

    public function create(array $data): bool {
        $stmt = $this->pdo->prepare('
            INSERT INTO appointments
                (patient_id, doctor_id, appointment_date, reason_for_visit, status, duration,appointment_type, notes)
            VALUES (:patient_id, doctor_id, :appointment_date, :reason_for_visit, :status, :duration, :appointment_type, :note)
        ');
        return $stmt->execute([
            'patient_id' => $data['doctor_id'],
            'doctor_id' => $data['doctor_id'],
            'appointment_date' => $data['appointment_date'],
            'reason_for_visit' => $data['reason_for_visit'] ?? null,
            'status' =>  $data['status'] ?? 30,
            'appointment_type' => $data['appointment_type'] ?? 'In-Person',
            'notes' => $data['notes'] ?? null,
        ]);
    }
    
    public function update(array $data): bool {
        $stmt = $this->pdo->prepare('
            UPDATE appointments
            SET patient_id = :patient_id,
                doctor_id = :doctor_id,
                appointment_date = :appointment_date,
                reason_for_visit = :reason_for_visit,
                status = :status,
                duration = :duration,
                appointment_type = :appointment_type,
                notes = :notes,
                updated_at = CURRENT_TIMESTAMP
            WHERE appointment_id = :appointment_id 
        ');

        return $stmt->execute([
            'appointment_id' => $data['appointment_id'],
            'patient_id_id' => $data['patient_id'],
            'doctor_id' => $data['doctor_id'],
            'appointment_date' => $data['appointment_date'],
            'reason_for_visit' => $data['reason_for_visit'] ?? null,
            'status' => $data['status'] ?? 'Scheduled',
            'duration' => $data['duration'] ?? 30,
            'appointment_type' => $data['appointment_type'] ?? 'In-Person',
            'notes' => $data['notes'] ?? null,
        ]);
    }
}