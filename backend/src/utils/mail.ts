import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for port 465
  auth: {
    user: process.env.MAIL_USER || process.env.SMTP_USER,
    pass: process.env.MAIL_PASS || process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP configuration error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

/**
 * Send Welcome Newsletter Email
 */
export const sendWelcomeNewsletterEmail = async (email: string) => {
  try {
    const mailOptions = {
      from: `"Nut Baba" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to Nut Baba Newsletter! 🥜",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <div style="background-color: #3D1B00; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <img src="https://nutbaba.in/images/nut%20baba%20logo.webp" alt="Nut Baba Logo" style="height: 60px; margin-bottom: 10px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Nut Baba!</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Hello there!</p>
            
            <p style="font-size: 16px; color: #374151;">Thank you for subscribing to the Nut Baba newsletter. We're "nuts" about health and thrilled to have you part of our community!</p>
            
            <p style="font-size: 16px; color: #374151;">What to expect from us:</p>
            <ul style="color: #374151; font-size: 14px;">
              <li>Exclusive discounts and early access to sales</li>
              <li>New flavor announcements</li>
              <li>Healthy recipes and nutrition tips</li>
              <li>Behind-the-scenes of your favorite peanut butter</li>
            </ul>

            <div style="background-color: #FCF0E5; border-radius: 10px; padding: 20px; text-align: center; margin: 25px 0;">
              <p style="font-size: 18px; font-weight: bold; color: #C45C26; margin: 0;">Use Code: WELCOME10</p>
              <p style="font-size: 14px; color: #813302; margin-top: 5px;">Enjoy 10% OFF on your next order!</p>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://nutbaba.in/shop" style="background-color: #C45C26; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold;">Shop Now</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
            
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              &copy; ${new Date().getFullYear()} Nut Baba. All rights reserved.
              <br />
              Noida, Uttar Pradesh, India
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Newsletter welcome email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    throw error;
  }
};

/**
 * Send OTP email
 */
export const sendOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    const mailOptions = {
      from: `"Nut Baba" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verification OTP - Nut Baba",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #3D1B00; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">NUT BABA</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Secure Login</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Dear <strong>${name}</strong>,</p>
            
            <p style="font-size: 16px; color: #374151;">Please use the following OTP to verify your email address:</p>
            
            <div style="background-color: white; border: 2px dashed #C45C26; border-radius: 10px; padding: 20px; text-align: center; margin: 25px 0;">
              <p style="font-size: 36px; font-weight: bold; color: #C45C26; letter-spacing: 8px; margin: 0;">${otp}</p>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;"><strong>This OTP will expire in 10 minutes.</strong></p>
            
            <p style="font-size: 14px; color: #6b7280;">If you didn't request this verification, please ignore this email.</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
            
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              This is a system-generated email.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

/**
 * Send Forgot Password OTP email
 */
export const sendForgotPasswordOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    const mailOptions = {
      from: `"Nut Baba" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset OTP - Nut Baba",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #3D1B00; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">NUT BABA</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Password Recovery</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Dear <strong>${name}</strong>,</p>
            
            <p style="font-size: 16px; color: #374151;">We received a request to reset your password. Please use the following OTP to reset your password:</p>
            
            <div style="background-color: white; border: 2px dashed #C45C26; border-radius: 10px; padding: 20px; text-align: center; margin: 25px 0;">
              <p style="font-size: 36px; font-weight: bold; color: #C45C26; letter-spacing: 8px; margin: 0;">${otp}</p>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;"><strong>This OTP will expire in 10 minutes.</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
            
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              This is a system-generated email.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Forgot password OTP email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending forgot password OTP email:", error);
    throw error;
  }
};

/**
 * Get status display text and color
 */
const getStatusInfo = (status: string) => {
  const statusMap: Record<string, { text: string; color: string; emoji: string }> = {
    pending: { text: 'Pending', color: '#EAB308', emoji: '⏳' },
    confirmed: { text: 'Confirmed', color: '#3B82F6', emoji: '✅' },
    processing: { text: 'Processing', color: '#8B5CF6', emoji: '🔄' },
    shipped: { text: 'Shipped', color: '#6366F1', emoji: '📦' },
    out_for_delivery: { text: 'Out for Delivery', color: '#F97316', emoji: '🚚' },
    delivered: { text: 'Delivered', color: '#22C55E', emoji: '🎉' },
    cancelled: { text: 'Cancelled', color: '#EF4444', emoji: '❌' },
  };
  return statusMap[status] || { text: status, color: '#6B7280', emoji: '📋' };
};

/**
 * Send Order Status Update Email
 */
export const sendOrderStatusUpdateEmail = async (email: string, orderDetails: any, newStatus: string) => {
  try {
    const statusInfo = getStatusInfo(newStatus);
    const itemsArray = typeof orderDetails.items === 'string' ? JSON.parse(orderDetails.items) : orderDetails.items;
    
    // Create items rows
    const itemsList = Array.isArray(itemsArray) ? itemsArray.map((item: any) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.name}</p>
          <p style="margin: 3px 0 0 0; font-size: 11px; color: #6b7280;">Qty: ${item.quantity} | ${item.size || 'Standard'} | ${item.texture || 'Smooth'}</p>
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold; font-size: 14px;">Rs. ${item.price * item.quantity}</td>
      </tr>
    `).join('') : '';

    const mailOptions = {
      from: `"Nut Baba" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Update: Your order is now ${statusInfo.text} ${statusInfo.emoji}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #3D1B00; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">NUT BABA</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Order Status Update</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Hello!</p>
            
            <p style="font-size: 16px; color: #374151;">Your order <strong>${orderDetails.order_number || orderDetails.orderNumber}</strong> has been updated.</p>
            
            <div style="background-color: white; border-radius: 10px; padding: 20px; text-align: center; margin: 25px 0; border: 2px solid ${statusInfo.color};">
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Current Status</p>
              <p style="font-size: 28px; font-weight: bold; color: ${statusInfo.color}; margin: 0;">${statusInfo.emoji} ${statusInfo.text}</p>
            </div>
            
            ${newStatus === 'shipped' ? `
            <div style="background-color: #EEF2FF; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #4338CA;"><strong>Your package is on its way!</strong> You will receive it within 3-5 business days.</p>
            </div>
            ` : ''}
            
            ${newStatus === 'out_for_delivery' ? `
            <div style="background-color: #FFF7ED; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #C2410C;"><strong>Exciting!</strong> Your order is out for delivery and will arrive today.</p>
            </div>
            ` : ''}
            
            ${newStatus === 'delivered' ? `
            <div style="background-color: #F0FDF4; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #166534;"><strong>Congratulations!</strong> Your order has been delivered. We hope you enjoy your purchase!</p>
            </div>
            ` : ''}
            
            ${newStatus === 'cancelled' ? `
            <div style="background-color: #FEF2F2; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #B91C1C;"><strong>Order Cancelled:</strong> If you have any questions, please contact our support team.</p>
            </div>
            ` : ''}
            
            <h3 style="color: #3D1B00; margin-top: 30px; margin-bottom: 15px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: white; border-radius: 8px; overflow: hidden;">
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            
            <div style="background-color: white; border-radius: 10px; padding: 15px; margin-top: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6b7280;">Subtotal:</span>
                <span style="font-weight: bold;">Rs. ${orderDetails.subtotal}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6b7280;">Shipping:</span>
                <span style="font-weight: bold;">Rs. ${orderDetails.shipping_charge !== undefined ? orderDetails.shipping_charge : orderDetails.shippingCharge}</span>
              </div>
              ${(orderDetails.discount_amount > 0 || orderDetails.discountAmount > 0) ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #22C55E;">Discount:</span>
                <span style="font-weight: bold; color: #22C55E;">-Rs. ${orderDetails.discount_amount || orderDetails.discountAmount}</span>
              </div>
              ` : ''}
              <div style="border-top: 2px solid #3D1B00; padding-top: 10px; margin-top: 10px; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; font-size: 16px;">Total:</span>
                <span style="font-weight: bold; font-size: 16px; color: #C45C26;">Rs. ${orderDetails.total_amount || orderDetails.totalAmount}</span>
              </div>
            </div>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://nutbaba.in/orders" style="background-color: #C45C26; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold;">Track Your Order</a>
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">Thank you for shopping with Nut Baba!</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Order status update email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending order status update email:", error);
  }
};

/**
 * Send Order Confirmation Email
 */
export const sendOrderConfirmationEmail = async (email: string, orderDetails: any) => {
  try {
    const itemsHtml = typeof orderDetails.items === 'string' ? JSON.parse(orderDetails.items) : orderDetails.items;
    
    // Create items rows
    const itemsList = Array.isArray(itemsHtml) ? itemsHtml.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0; font-weight: bold;">${item.name}</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">Qty: ${item.quantity} | ${item.size} | ${item.texture}</p>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">Rs. ${item.price * item.quantity}</td>
      </tr>
    `).join('') : '';

    const mailOptions = {
      from: `"Nut Baba" <${process.env.MAIL_USER || process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Confirmed - ${orderDetails.order_number || orderDetails.orderNumber} 🥜`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #3D1B00; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">NUT BABA</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Order Confirmed!</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Hello!</p>
            <p style="font-size: 16px; color: #374151;">Great news! Your order <strong>${orderDetails.order_number || orderDetails.orderNumber}</strong> has been confirmed and is being processed.</p>
            
            <h3 style="color: #3D1B00; margin-top: 30px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
                  <td style="padding: 10px; text-align: right;">Rs. ${orderDetails.subtotal}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; text-align: right; font-weight: bold;">Shipping:</td>
                  <td style="padding: 10px; text-align: right;">Rs. ${orderDetails.shipping_charge !== undefined ? orderDetails.shipping_charge : orderDetails.shippingCharge}</td>
                </tr>
                ${orderDetails.discount_amount > 0 || orderDetails.discountAmount > 0 ? `
                <tr>
                  <td style="padding: 10px; text-align: right; font-weight: bold; color: green;">Discount:</td>
                  <td style="padding: 10px; text-align: right; color: green;">-Rs. ${orderDetails.discount_amount || orderDetails.discountAmount}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #3D1B00;">Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #3D1B00;">Rs. ${orderDetails.total_amount || orderDetails.totalAmount}</td>
                </tr>
              </tfoot>
            </table>

            <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 30px;">You can track your order status in the 'My Orders' section of your account.</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">Thank you for shopping with Nut Baba!</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
};
