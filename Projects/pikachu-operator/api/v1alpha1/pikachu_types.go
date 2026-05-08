/*
Copyright 2026.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// PikachuSpec defines the desired state of Pikachu
type PikachuSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	Level         int32  `json:"level,omitempty"`
	ElectricPower string `json:"electricPower,omitempty"`
}

// PikachuStatus defines the observed state of Pikachu
type PikachuStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	Health string `json:"health,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// Pikachu is the Schema for the pikachus API
type Pikachu struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PikachuSpec   `json:"spec,omitempty"`
	Status PikachuStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// PikachuList contains a list of Pikachu
type PikachuList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Pikachu `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Pikachu{}, &PikachuList{})
}
