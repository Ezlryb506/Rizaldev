'use client';

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Mail, MapPin, Phone, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>

const ContactSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormValues) => {
    // Simulate API call
    console.log("[Contact] Submitting form payload:", { ...values, language });
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success(t.contact.form.success.title, {
      description: t.contact.form.success.description,
    });

    form.reset();
  };

  const handleWhatsAppContact = () => {
    const values = form.getValues();
    const message = `${language === 'id' ? 'Halo' : 'Hi'} Arizal, ${language === 'id' ? 'saya tertarik untuk mendiskusikan proyek pengembangan web' : 'I\'m interested in discussing a web development project'}. \n\n${language === 'id' ? 'Detail Proyek:' : 'Project Details:'}\n- ${language === 'id' ? 'Nama:' : 'Name:'} ${values.name || (language === 'id' ? 'Tidak disebutkan' : 'Not specified')}\n- ${language === 'id' ? 'Perusahaan:' : 'Company:'} ${values.company || (language === 'id' ? 'Tidak disebutkan' : 'Not specified')}\n- ${language === 'id' ? 'Anggaran:' : 'Budget:'} ${values.budget || (language === 'id' ? 'Akan didiskusikan' : 'To be discussed')}\n- ${language === 'id' ? 'Timeline:' : 'Timeline:'} ${values.timeline || (language === 'id' ? 'Fleksibel' : 'Flexible')}\n\n${language === 'id' ? 'Pesan:' : 'Message:'} ${values.message || (language === 'id' ? 'Menantikan diskusi tentang kebutuhan proyek saya.' : 'Looking forward to discussing my project requirements.')}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6288809635936?text=${encodedMessage}`, '_blank');
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: t.contact.methods.whatsapp.title,
      description: t.contact.methods.whatsapp.description,
      action: t.contact.methods.whatsapp.action,
      primary: true,
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: t.contact.methods.email.title,
      description: t.contact.methods.email.description,
      action: t.contact.methods.email.action,
      primary: false,
    },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-description">{t.contact.description}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`contact-method ${method.primary ? 'primary' : ''}`}>
                  <CardContent className="method-content">
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-info">
                      <h3 className="method-title">{method.title}</h3>
                      <p className="method-description">{method.description}</p>
                    </div>
                    <Button
                      className={`method-action ${method.primary ? 'primary' : 'secondary'}`}
                      onClick={method.primary ? handleWhatsAppContact : () => {}}
                      type="button"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="contact-details">
              <div className="detail-item" title={t.contact.details.location}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <span>{t.contact.details.location}</span>
              </div>
              <div className="detail-item">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <a
                  href={`https://wa.me/${t.contact.details.phone.replace(/\s|\+/g, '')}`}
                  className="contact-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`WhatsApp ${t.contact.details.phone}`}
                >
                  {t.contact.details.phone}
                </a>
              </div>
              <div className="detail-item">
                <Mail className="h-5 w-5" aria-hidden="true" />
                <a
                  href={`mailto:${t.contact.details.email}`}
                  className="contact-link"
                  aria-label={`Email ${t.contact.details.email}`}
                >
                  {t.contact.details.email}
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <Card className="contact-form-card">
              <CardContent className="form-content">
                <div className="form-header">
                  <h3 className="form-title">{t.contact.form.title}</h3>
                  <p className="form-description">
                    {t.contact.form.description}
                    <br />
                    <em style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                      {language === 'id'
                        ? 'Catatan: Pesan disimpan ke database. Email otomatis belum diimplementasikan - gunakan WhatsApp untuk respon cepat.'
                        : 'Note: Messages are saved to database. Automatic email sending not implemented yet - use WhatsApp for quick response.'}
                    </em>
                  </p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="contact-form">
                    <div className="form-row">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="form-group">
                            <FormLabel>{t.contact.form.fields.name}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.contact.form.placeholders.name} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="form-group">
                            <FormLabel>{t.contact.form.fields.email}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t.contact.form.placeholders.email} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="form-row">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="form-group">
                            <FormLabel>{t.contact.form.fields.company}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.contact.form.placeholders.company} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem className="form-group">
                            <FormLabel>{t.contact.form.fields.budget}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.contact.form.placeholders.budget} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormLabel>{t.contact.form.fields.timeline}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.contact.form.placeholders.timeline} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="form-group">
                      <FormLabel>{t.contact.form.fields.message}</FormLabel>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea placeholder={t.contact.form.placeholders.message} rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="form-actions">
                      <Button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="loading-spinner"></div>
                            {t.contact.form.actions.sending}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {t.contact.form.actions.send}
                          </>
                        )}
                      </Button>

                      <div className="form-alternative">
                        <span>{t.contact.form.actions.alternative}</span>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleWhatsAppContact}
                          className="whatsapp-btn"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {t.contact.form.actions.whatsapp}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
