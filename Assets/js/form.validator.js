var FormValidator = {
    
    _control_selectors: 'select, input, textarea',
    
    form: null,
	
	init: function()
	{
		$('form').each(function(){
			$(this).attr('novalidate', 'novalidate');
		});
	},
    
    run: function(form_selector)
    {
		FormValidator.form = $(form_selector);

		var is_valid = true;

		FormValidator.form.find(FormValidator._control_selectors).each(function()
		{
			if ($(this).is('[required]'))
			{
				if (FormValidator.validateControl(this) === false)
				{
					is_valid = false;
				}
			}
		});

		return is_valid;
    },
	
	validateControl: function(control)
	{
		FormValidator.removeControlError(control);
		
		var value = $.trim($(control).val());
		var type = $(control).attr('type');
		
		if (type === 'checkbox' && !$(control).prop('checked'))
		{
			FormValidator.addControlError(control, 'Check this control');
			return false;
		}
		
		if (value === '')
		{
			FormValidator.addControlError(control, 'Field is required');
			return false;
		}
		
		if (type === 'email')
		{
			var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!regexp.test(value))
			{
				FormValidator.addControlError(control, 'Please enter valid email');
				return false;
			}
		}
	},
	
	addControlError: function(control, message)
	{
		if ($(control).closest('.form-group').hasClass('has-error') === false)
		{
			$(control).closest('.form-group').append('<div class="help-block error">' + message + '</div>').addClass('has-error');
		}
	},
	
	removeControlError: function(control)
	{
		$(control).closest('.form-group').removeClass('has-error').addClass('has-success');
		$(control).closest('.form-group').find('.help-block.error').remove();
	}
    
};