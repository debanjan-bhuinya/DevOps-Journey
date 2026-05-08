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

package controller

import (
	"context"

	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/tools/record"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	pikachuv1alpha1 "github.com/debanjan-bhuinya/pikachu-operator/api/v1alpha1"
)

// PikachuReconciler reconciles a Pikachu object
type PikachuReconciler struct {
	client.Client
	Scheme   *runtime.Scheme
	Recorder record.EventRecorder
}

//+kubebuilder:rbac:groups=core.pikachu.com,resources=pikachus,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=core.pikachu.com,resources=pikachus/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=core.pikachu.com,resources=pikachus/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Pikachu object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.15.0/pkg/reconcile
func (r *PikachuReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// 1. Fetch the Pikachu Data from the Database
	var pikachu pikachuv1alpha1.Pikachu
	if err := r.Get(ctx, req.NamespacedName, &pikachu); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 2. Define the Physical Body (A standard Kubernetes Pod running Nginx)
	podName := pikachu.Name + "-body"
	pod := &corev1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      podName,
			Namespace: pikachu.Namespace,
		},
		Spec: corev1.PodSpec{
			Containers: []corev1.Container{{
				Name:  "pikachu-container",
				Image: "nginx:latest", // Nginx is the physical body!
			}},
		},
	}

	// 3. Set Pikachu as the "Owner" (If you delete Pikachu, K8s auto-deletes the Pod)
	ctrl.SetControllerReference(&pikachu, pod, r.Scheme)

	// 4. Check if the Pod already exists. If not, CREATE IT!
	found := &corev1.Pod{}
	err := r.Get(ctx, client.ObjectKey{Name: podName, Namespace: pikachu.Namespace}, found)
	if err != nil && apierrors.IsNotFound(err) {
		logger.Info("⚡ Creating a physical body for Pikachu!", "Pod.Name", pod.Name)
		err = r.Create(ctx, pod)
		if err != nil {
			return ctrl.Result{}, err
		}
		r.Recorder.Event(&pikachu, "Normal", "BodyCreated", "Successfully provisioned the physical Nginx body ⚡")
		return ctrl.Result{Requeue: true}, nil
	} else if err != nil {
		return ctrl.Result{}, err
	}

	// 5. If it already exists, do nothing.
	logger.Info("Pikachu's body is already running!", "Pod.Name", found.Name)
	// --- DAY 106: STATUS TELEMETRY LOGIC ---

	// Define the actual health based on the Pod's current phase
	actualHealth := "Unknown"
	if found.Status.Phase == corev1.PodRunning {
		actualHealth = "Healthy - Battle Ready! ⚡"
	} else if found.Status.Phase == corev1.PodPending {
		actualHealth = "Incubating... 🥚"
	} else {
		actualHealth = "Fainted (Check Logs) 😵"
	}

	// If the recorded health doesn't match the actual health, update the database!
	if pikachu.Status.Health != actualHealth {
		pikachu.Status.Health = actualHealth
		err := r.Status().Update(ctx, &pikachu)
		if err != nil {
			logger.Error(err, "Failed to update Pikachu status")
			return ctrl.Result{}, err
		}
		logger.Info("📊 Updated Pikachu Health Status!", "New Health", actualHealth)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *PikachuReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&pikachuv1alpha1.Pikachu{}). // <--- THIS IS THE FIX!
		Complete(r)
}
