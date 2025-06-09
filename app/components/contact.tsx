"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
  fetch("https://formspree.io/f/mkgbjrzk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      if (response.ok) {
        alert("Gửi thành công! Cảm ơn bạn đã liên hệ.");
        form.reset(); // reset form sau khi gửi thành công
      } else {
        alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gửi form:", error);
      alert("Không thể gửi tin nhắn. Vui lòng thử lại sau.");
    });
}


  return (
    <section id="contact" className="relative overflow-hidden bg-zinc-900 py-20">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">Liên hệ hợp tác</h2>
          <p className="mb-8 text-gray-400">
            Bạn có muốn hợp tác hoặc đặt hàng một tác phẩm không? Hãy cùng nhau tạo ra điều gì đó tuyệt vời.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Họ và Tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Họ và tên"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@email.com"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Tin nhắn</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dự án của bạn là gì?"
                        className="min-h-[120px] bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Gửi
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 50 }).map((_, i) => (
            <line key={i} x1={i * 2} y1="0" x2={i * 2} y2="100" stroke="white" strokeWidth="0.1" />
          ))}
        </svg>
      </div>
    </section>
  )
}
