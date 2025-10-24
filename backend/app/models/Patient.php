<?php

/* app/Models/Patient.php */
require_once 'BaseModel.[php';

class Patient extends BaseModel {
    protected string $table = 'patients';

    public function create(array $data): bool {
        $stmt = $this->pdo->prepare('
                INSERT INTO patients (first_name, last_name, dob, gender, phone, email, address, medical_history)
                VALUES (:first_name, :last_name, :dob, :gender, :phone, :email, :address, :medical_history)
            ');

        return $stmt->execute([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'dob' => $data['dob'],
                'gender' => $data['gender'] ?? null,
                'phone' => $data['phone'] ?? null,
                'email' => $data['email'] ?? null,
                'address' => $data['address'] ?? null,
                'medical_history' => $data['medical_history'] ?? null,
        ]);
    }

    public function update(array $data): bool{
        $stmt = $this->pdo->prepare('
            UPDATE patients 
            SET first_name = :first_name,
                last_name = :last_name,
                dob = :dob,
                gender = :gender,
                phone = :phone,
                email = :email,
                address = :address,
                medical_history = :medical_history,
                updated_at = CURRENT_TIMESTAMP
            WHERE patient_id = :patient_id
        ');

        return $stmt->execute([
            'patient_id' => $data['patient_id'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'dob' => $data['dob'],
            'gender' => $data['gender'] ?? null,
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null ,
            'address' => $data['address'] ?? null,
            'medical_history' => $data['medical_history'] ?? null,
        ]);
    }
}