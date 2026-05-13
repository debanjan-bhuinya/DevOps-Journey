package v1alpha1

import (
	"context"
	"fmt"

	ctrl "sigs.k8s.io/controller-runtime"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/webhook/admission"

	pikachuv1alpha1 "github.com/debanjan-bhuinya/pikachu-operator/api/v1alpha1"
)

var pikachulog = logf.Log.WithName("pikachu-resource")

// SetupWebhookWithManager registers the webhook for Pikachu in the manager.
func SetupPikachuWebhookWithManager(mgr ctrl.Manager) error {
	// Notice we pass both the manager AND the Pikachu type now!
	return ctrl.NewWebhookManagedBy(mgr, &pikachuv1alpha1.Pikachu{}).
		WithValidator(&PikachuCustomValidator{}).
		Complete()
}

// +kubebuilder:webhook:path=/validate-core-pikachu-com-v1alpha1-pikachu,mutating=false,failurePolicy=fail,sideEffects=None,groups=core.pikachu.com,resources=pikachus,verbs=create;update,versions=v1alpha1,name=vpikachu.kb.io,admissionReviewVersions=v1

type PikachuCustomValidator struct{}

// ValidateCreate specifically expects a Pikachu object now, no more runtime.Object!
func (v *PikachuCustomValidator) ValidateCreate(ctx context.Context, pikachu *pikachuv1alpha1.Pikachu) (admission.Warnings, error) {
	pikachulog.Info("🛡️ Gatekeeper Intercepted a Creation Request!", "name", pikachu.Name)

	if pikachu.Spec.Level <= 0 {
		return nil, fmt.Errorf("🛑 DENIED: A Pikachu cannot have a level of %d. It must be at least Level 1", pikachu.Spec.Level)
	}

	if pikachu.Spec.Level > 100 {
		return nil, fmt.Errorf("🛑 DENIED: Level %d is impossible! Max level cap is 100", pikachu.Spec.Level)
	}

	pikachulog.Info("✅ Gatekeeper Approved the Request!", "name", pikachu.Name)
	return nil, nil
}

// ValidateUpdate specifically expects old and new Pikachu objects
func (v *PikachuCustomValidator) ValidateUpdate(ctx context.Context, oldObj, newObj *pikachuv1alpha1.Pikachu) (admission.Warnings, error) {
	pikachulog.Info("🛡️ Gatekeeper Intercepted an Update Request!", "name", newObj.Name)

	if newObj.Spec.Level <= 0 {
		return nil, fmt.Errorf("🛑 DENIED: A Pikachu cannot have a level of %d. It must be at least Level 1", newObj.Spec.Level)
	}

	if newObj.Spec.Level > 100 {
		return nil, fmt.Errorf("🛑 DENIED: Level %d is impossible! Max level cap is 100", newObj.Spec.Level)
	}

	pikachulog.Info("✅ Gatekeeper Approved the Update!", "name", newObj.Name)
	return nil, nil
}

// ValidateDelete specifically expects a Pikachu object
func (v *PikachuCustomValidator) ValidateDelete(ctx context.Context, pikachu *pikachuv1alpha1.Pikachu) (admission.Warnings, error) {
	return nil, nil
}
